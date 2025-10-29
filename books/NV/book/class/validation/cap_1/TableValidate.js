class TableValidate extends BaseValidate {
  constructor() {
    super();
  }

  iniTMainValidations(def, conditions) {
    this.travelValidate(def, conditions);
    return this.data;
  }
}
