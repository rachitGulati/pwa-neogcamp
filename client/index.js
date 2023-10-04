// Check if service workers are supported
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js", {
    scope: "/",
  });
}

window.subscribe = async function () {
  if (!("serviceWorker" in navigator)) {
    return alert("Service worker not supported");
  }

  const registeration = await navigator.serviceWorker.ready;

  const subscription = await registeration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PublicKey),
  });

  console.log(subscription);
  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json",
    },
  });
};
