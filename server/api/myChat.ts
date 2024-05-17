import { nowDate } from "~/mylib";

const room = "ROOM";

let clients: TClient[] = [];

export default defineWebSocketHandler({
  open(peer) {
    peer.subscribe(room);

    console.log("ws-open", peer, peer.readyState, peer.addr, peer.url);

    //Получить имя клиента
    let param = new URLSearchParams("ws://" + peer.addr + peer.url);
    let userName: string | null = "";
    if (param.has("user")) {
      userName = param.get("user");
    }

    //console.log(param, ",", userName);
    userName = userName !== null ? userName : "Anonimus-" + peer.id;
    let findClient: TClient | undefined = clients.find(
      (item) => item.name.toLowerCase() === userName?.toLowerCase()
    );
    if (!findClient) {
      let ind: number = clients.findIndex((item) => item.name === userName);
      if (ind === -1) {
        clients.push({
          id: peer.id,
          name: userName as string,
          isFromServer: true,
        });
      } else {
        clients[ind] = { id: peer.id, name: userName, isFromServer: true };
      }
    }

    let newClient: TClientMessage = {
      id: peer.id,
      name: userName as string,
      message: " Вошел в чат",
      messageDate: nowDate(),
    };
    peer.publish(room, JSON.stringify(newClient));
    //peer.publish(room, JSON.stringify(clients));
  },

  message(peer, message) {
    // peer.subscribe(room);
    //console.log("ws message", peer, message);
    // let obj = JSON.parse(message.text());
    // if (obj) {
    //   clients.forEach((item) => {
    //     if (
    //       item.id.toLowerCase() === peer.id.toLowerCase() &&
    //       item.name === ""
    //     ) {
    //       return (item.name = obj.name);
    //     }
    //   });
    // }
    peer.publish(room, message.text());
    peer.publish(room, JSON.stringify(clients));
  },

  close(peer, event) {
    //peer.publish(room, event.reason);
    let closeClient: TClient | undefined = undefined;
    if (clients.length > 0) {
      closeClient = clients.find((item) => item.id === peer.id);
    }
    if (closeClient) {
      peer.publish(
        room,
        JSON.stringify({
          id: peer.id,
          name: closeClient.name,
          message: "Покинул чат",
          messageDate: nowDate(),
        })
      );
    }
    //Удалить из массива
    if (closeClient) {
      clients = clients.filter((item) => {
        item.id !== peer.id;
      });
      //console.log("Всего клиентов: ", clients.length);
    }
    // }
    //if (clients.length > 0) {
    //peer.publish(room, JSON.stringify(clients));
    //}
    //peer.unsubscribe(room);
    console.log("[ws] close", peer, event);
  },

  error(peer, error) {
    console.log("[ws] error", peer, error);
  },
});
