
class ContainerLayout {

  static test = []

  constructor(selector = false, body = document.querySelector('body')) {

    this.body = body
    this.domNode = selector != false ? document.querySelector(selector) : this.initContainerParent()
    if (this.domNode === null) this.domNode = this.initContainerParent()

    this.childs = []
    ContainerLayout.test = ContainerLayout.test + 1
  }

  getNode() {
    return this.domNode
  }

  getIdentification() {
    return this.domNode.classList[0]
  }

  addHtml(html = '<strong>el html se agrega vacio<strong>') {
    this.domNode.insertAdjacentHTML('afterbegin', html)

  }


  initContainerParent() {

    const x = this.createContainers('div', true)
    x.classList.add(`container-${ContainerLayout.test.length}`)
    this.addElement(x, this.body, true)
    return this.body.querySelector(`.container-${ContainerLayout.test.length}`)
  }

  createContainers(type = 'div', init = false, className = 'subcontainer') {
    const container = document.createElement(type)

    if (!init) {

      this.childs.push(container)

      container.classList.add(className)
    }
    return container
  }

  setLayout(type = 'normal') {
    this.domNode.classList.add(type)
  }

  addText(textParam = '', selectorParent = {}) {

    const text = document.createElement('p')
    text.textContent = textParam
    const container = this.domNode.querySelector(selectorParent)
    console.log(container);
    container.appendChild(text)
  }

  addClassToAllChild(className) {

  }


  addElement(element, parent, method = false) {

    console.log(parent);
    parent.appendChild(element)
  }

  add(element) {
    this.domNode.appendChild(element)
    //this.domNode.insertAdjacentHTML('beforeend',element)
  }
}

function createLayouts(definition, definitionBoards = null, definitionExcersice) {

  for (let currentDef in definition) {

    const parentName = definition[currentDef].parentContainer ? definition[currentDef].parentContainer : false
    const parentContainer = document.querySelector(parentName)

    const container = new ContainerLayout(parentName)

    const containerClasses = definition[currentDef].classes ? definition[currentDef].classes : ''
    container.getNode().classList += ' ' + containerClasses

    const styles = definition[currentDef].style ? definition[currentDef].style : ''
    container.getNode().style.cssText = styles
    container.addClassToAllChild('subcontainer')


    if (definition[currentDef]?.addHtml) {

      container.addHtml(definition[currentDef].addHtml)
    }

    definition[currentDef].containers.forEach((subcontainer, i) => {

      const defElements = {
        attributes: [],

        ...subcontainer
      }

      container.add(container.createContainers('div', false))
      //container.childs.at(-1).classList = !subcontainer.classes ? [] : subcontainer.classes
      //console.log(subcontainer);            

      const currentNode = container.childs.at(-1)

      currentNode.classList = defElements?.classes ?? 'subcontainer'
      currentNode.id = defElements?.id || `container_${i}`
      currentNode.style.cssText += defElements?.style || {}
      if (defElements?.boardName && defElements?.boardName != '') {
        //const elementReturned = gBoard(ref, etwDefBoardsParam[boardSelect], id, style);
        const elementReturned = gBoard({}, defElements.boardObject, subcontainer.id, subcontainer.boardObject.style);
      }

      if (defElements?.addHtml) {
        //
        container.childs.at(-1).insertAdjacentHTML('afterbegin', subcontainer.addHtml)
      }

      defElements.attributes.forEach(attr => {
        container.childs.at(-1).setAttribute(`data-${attr[0]}`, attr[1])
      })

      if (defElements?.textContent) {
        currentNode.textContent = defElements.textContent

      }


    })

    container.setLayout(definition[currentDef].typeLayout || 'normal')


    definition[currentDef].containers
  }
}
