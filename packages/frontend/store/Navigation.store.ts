import {action, computed, makeObservable, observable} from "mobx";


class NavigationStore<T> {

  @observable
  private navigationStack: T[] = []

  constructor(initialView: T) {
    makeObservable(this)
    this.navigationStack.push(initialView)
  }

  @computed
  get currentView() {
    return this.navigationStack[this.navigationStack.length - 1]
  }

  set currentView(view) {
    this.navigationStack.push(view)
  }

  goBack() {
    this.navigationStack.pop()
  }

  @computed
  get canGoBack() {
    return this.navigationStack.length > 1
  }
}

export default NavigationStore
