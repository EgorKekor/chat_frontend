import { HttpsOrigin } from "../paths.js"


class WebSocketIface {
    constructor() {
        this.isOpen = false;
        this.addErrorHandler(
            (error) => {
                // console.log(`[error] ${error}`);
                // console.log(error);
            }
        );

        this.addOpenHandler(
            (event) => {
                this.isOpen = true;
            }
        );

        this.addCloseHandler(
            (event) => {
                this.isOpen = false;
                if (event.wasClean) {
                    console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
                } else {
                    console.log(`[close] Соединение прервано, код=${event.code} причина=${event}`);
                }
            }
        );
    }

    sentMessage(body) {
        this.socket.send(body);
    }

    _getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }

    connect() {
        this.socket = new WebSocket("ws://localhost:8081/api/ws");

        this.socket.onopen = (event) => {
            if (this.openHandlers) {
                for (const handler of this.openHandlers) {
                    handler(event);
                }
            }
        };

        this.socket.onclose = (event) => {
            if (this.closeHandlers) {
                for (const handler of this.closeHandlers) {
                    handler(event);
                }
            }
        };

        this.socket.onerror = (error) => {
            if (this.errHandlers) {
                for (const handler of this.errHandlers) {
                    handler(error);
                }
            }
        };


        this.socket.onmessage = (event) => {
            if (this.handlersMap) {
                const objMessage = JSON.parse(event.data);
                console.log(objMessage);
                for (const type in this.handlersMap) {
                    if (objMessage.type === type) {
                        for (const handler of this.handlersMap[type]) {
                            handler(objMessage);
                        }
                    }
                }
            }
        };
    }


    disconnect() {
        this.clearHandlers();
    }


    addMessageHandler(type, handler) {
        if (!this.handlersMap) {
            this.handlersMap = {};
        }

        if (!this.handlersMap[type]) {
            this.handlersMap[type] = new Array;
        }

        this.handlersMap[type].push(handler);
    }

    removeMessageHandler(type, removing) {
        if (!this.handlersMap) {
            return;
        }

        if (!this.handlersMap[type]) {
            return;
        }

        this.handlersMap[type] = this.handlersMap[type]
            .filter((handler) => handler !== removing);
    }


    addErrorHandler(handler) {
        if (!this.errHandlers) {
            this.errHandlers = new Array;
        }

        this.errHandlers.push(handler);
    }

    removeErrorHandler(handler) {
        if (!this.errHandlers) {
            return;
        }

        this.errHandlers = this.errHandlers.filter(function (handler) {
            return handler !== removing;
        });
    }


    addOpenHandler(handler) {
        if (!this.openHandlers) {
            this.openHandlers = new Array;
        }

        this.openHandlers.push(handler);
    }

    removeOpenHandler(removing) {
        if (!this.openHandlers) {
            return;
        }

        this.openHandlers = this.openHandlers.filter(function (handler) {
            return handler !== removing;
        });
    }

    addCloseHandler(handler) {
        if (!this.closeHandlers) {
            this.closeHandlers = new Array;
        }

        this.closeHandlers.push(handler);
    }

    removeCloseHandler(removing) {
        if (!this.closeHandlers) {
            return;
        }

        this.closeHandlers = this.closeHandlers.filter(function (handler) {
            return handler !== removing;
        });
    }


    clearHandlers() {
        this.handlersMap = {};
        this.errHandlers = new Array;
        this.closeHandlers = new Array;
        this.openHandlers = new Array;


        this.addOpenHandler(
            (event) => {
                // console.log("[open] Соединение установлено");
            }
        );


        this.addErrorHandler(
            (error) => {
                // console.log(`[error] ${error}`);
                // console.log(error);
            }
        );

        this.addCloseHandler(
            (event) => {
                if (event.wasClean) {
                    // console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
                } else {
                    // console.log(`[close] Соединение прервано, код=${event.code} причина=${event.reason}`);
                }
            }
        );
    }
}

export default new WebSocketIface();