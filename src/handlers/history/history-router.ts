class HistoryRouter {
  private callback: (path: string) => void;
  private window: any;
  private history: History;

  constructor(callback: (path: string) => void) {
    this.callback = callback;
    this.window = Function('return this')();
    this.history = this.window.history;
  }

  back(): void {
    if (this.history) {
      this.history.back();
    }
  }

  go(path: string, replace: boolean = false): void {
    console.log('go : ' + path);
    if (this.history) {
      const f = replace ? history.replaceState : history.pushState;
      f.apply(history, [null, null, path]);
    }
    this.callback(path);
  }

  start(): void {
    if (this.history) {
      this.window.addEventListener('popstate', () => {
        const path = this.window.location.pathname;
        console.log('back : ' + path);
        this.callback(path);
      }, false);
    }
  }
}

export { HistoryRouter };
