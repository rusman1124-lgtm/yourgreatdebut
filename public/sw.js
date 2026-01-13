// public/sw.js
self.addEventListener('install', (e) => {
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (e) => {
    console.log('서비스 워커 활성화됨');
  });
  
  // 알림 클릭 시 앱으로 이동
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
      clients.openWindow('/')
    );
  });