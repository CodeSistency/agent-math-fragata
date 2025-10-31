# API Architecture and Issues Visualization

## Current Architecture Flow

```mermaid
graph TB
    Client[Client Application] --> |POST /api/books/sync-v2| SyncAPI[Sync API]
    Client --> |GET /api/engines/discover| DiscoverAPI[Engine Discovery API]
    
    SyncAPI --> |1. Initialize DB| DB[(Database)]
    SyncAPI --> |2. Parse Books| Parser[Book Parser]
    SyncAPI --> |3. Process Definitions| DefProcessor[Definition Processor]
    SyncAPI --> |4. Store in Vector DB| VectorStore[(Vector Store)]
    SyncAPI --> |5. Clear Cache| Cache[Engine Cache]
    
    DiscoverAPI --> |1. Validate Params| Validator[Input Validator]
    DiscoverAPI --> |2. Scan Files| FileSystem[File System]
    DiscoverAPI --> |3. Extract Metadata| MetadataExtractor[Metadata Extractor]
    DiscoverAPI --> |4. Return Engines| Response[Response]
    
    Parser --> UnifiedParser[Unified Parser]
    Parser --> LegacyParser[Legacy Parser]
    
    DefProcessor --> MGParser[MG Format Parser]
    DefProcessor --> NVParser[NV Format Parser]
    
    subgraph "Critical Issues"
        Issue1[No DB Transactions]
        Issue2[Vector Store Race Condition]
        Issue3[Path Traversal Vulnerability]
        Issue4[Type Safety Issues]
        Issue5[Memory Leaks]
    end
    
    SyncAPI -.-> Issue1
    SyncAPI -.-> Issue2
    DiscoverAPI -.-> Issue3
    Parser -.-> Issue4
    VectorStore -.-> Issue5
```

## Data Flow Issues

```mermaid
sequenceDiagram
    participant C as Client
    participant S as Sync API
    participant DB as Database
    participant VS as Vector Store
    participant P as Parser
    
    C->>S: POST /api/books/sync-v2
    S->>DB: Initialize (no transaction)
    S->>P: Parse book structure
    
    alt Book exists
        S->>DB: Delete book (no transaction)
        Note over S,DB: Risk: Partial deletion
    end
    
    S->>DB: Create book record
    Note over S,DB: Risk: No rollback on failure
    
    S->>P: Process pages
    P->>S: Exercises
    
    S->>VS: Store embeddings
    Note over S,VS: Risk: Race condition on dimension
    
    alt Error occurs
        Note over S: Data inconsistent state
        S->>C: Error response
    else Success
        S->>C: Success response
    end
```

## Security Vulnerability Flow

```mermaid
graph LR
    Attacker[Attacker] --> |bookId=../../../etc/passwd| API[Engine Discovery API]
    API --> |No validation| Path[Path Construction]
    Path --> |../../../etc/passwd| FS[File System]
    FS --> |Sensitive files| Leak[Data Leak]
    
    style Attacker fill:#ffcccc
    style API fill:#ffcccc
    style Path fill:#ffcccc
    style FS fill:#ffcccc
    style Leak fill:#ffcccc
```

## Proposed Fixed Architecture

```mermaid
graph TB
    Client[Client Application] --> |POST /api/books/sync-v2| SyncAPI[Sync API v2]
    Client --> |GET /api/engines/discover| DiscoverAPI[Engine Discovery API v2]
    
    subgraph "Input Validation Layer"
        InputValidator[Input Validator]
        Sanitizer[Input Sanitizer]
    end
    
    subgraph "Transaction Layer"
        TransactionManager[Transaction Manager]
        RollbackHandler[Rollback Handler]
    end
    
    subgraph "Error Handling Layer"
        ErrorHandler[Error Handler]
        RetryMechanism[Retry Mechanism]
        Logger[Structured Logger]
    end
    
    subgraph "Processing Layer"
        SafeParser[Type-Safe Parser]
        StreamProcessor[Stream Processor]
        VectorStoreV2[Thread-Safe Vector Store]
    end
    
    SyncAPI --> InputValidator
    DiscoverAPI --> InputValidator
    InputValidator --> Sanitizer
    Sanitizer --> TransactionManager
    
    SyncAPI --> TransactionManager
    TransactionManager --> DB[(Database)]
    TransactionManager --> RollbackHandler
    
    SyncAPI --> ErrorHandler
    DiscoverAPI --> ErrorHandler
    ErrorHandler --> RetryMechanism
    ErrorHandler --> Logger
    
    SyncAPI --> SafeParser
    SafeParser --> StreamProcessor
    StreamProcessor --> VectorStoreV2
    VectorStoreV2 --> VS[(Vector Store)]
```

## Error Recovery Flow

```mermaid
stateDiagram-v2
    [*] --> Processing
    Processing --> Error: Error occurs
    Error --> IsRetryable: Check error type
    IsRetryable --> Yes: Retryable error
    IsRetryable --> No: Non-retryable error
    
    Yes --> Retry: Attempt retry
    Retry --> Processing: Retry successful
    Retry --> MaxRetries: Max retries reached
    
    No --> Cleanup: Cleanup resources
    MaxRetries --> Cleanup
    Cleanup --> Rollback: Rollback transaction
    Rollback --> [*]
    
    Processing --> Success: All operations complete
    Success --> Commit: Commit transaction
    Commit --> [*]
```

## Performance Optimization Flow

```mermaid
graph LR
    Input[Large Book Input] --> Chunker[Chunker]
    Chunker --> |Chunks| Queue[Processing Queue]
    Queue --> Worker1[Worker 1]
    Queue --> Worker2[Worker 2]
    Queue --> WorkerN[Worker N]
    
    Worker1 --> |Processed| Collector[Result Collector]
    Worker2 --> |Processed| Collector
    WorkerN --> |Processed| Collector
    
    Collector --> |Stream| Client[Client Updates]
    
    subgraph "Memory Management"
        GC[Garbage Collection]
        Pool[Object Pool]
    end
    
    Worker1 --> GC
    Worker2 --> GC
    WorkerN --> GC
    Queue --> Pool