process.env.UV_THREADPOOL_SIZE = 1;

const cluster = require("cluster");

// Is the file being executed in master mode?
if (cluster.isMaster) {
  console.log("Cause index.js to be executed *again* but in child mode");
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  console.log("Im a child, Im going to act like a server and do nothing else");
  const crypto = require("crypto");
  const express = require("express");
  const app = express();

  function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {}
  }

  app.get("/", (req, res) => {
    crypto.pbkdf2("a", "b", 100000, 51, "sha512", () => {
      res.send("Hi there");
    });
  });

  app.get("/doWork", (req, res) => {
    doWork(1000 * 5);
    res.send("This was done work!");
  });

  app.get("/fast", (req, res) => {
    res.send("This was fast!");
  });

  app.listen(3000);
}

/** [In Mac or Linux] 서버벤치마크
 * 동시에 2개의 요청을 보낸다. 요청 횟수는 2개.
 * $ ab -c 2 -n 2 localhost:3000/
 */

/** child가 많다고 무조건 빠르지 않다!
 * [CPU: 듀얼코어 & 하나의 요청 처리시간: 1초]
 *
 * # 쓰레드 1개 사용
 *  1) child 2개 + 2개 요청 동시에 2개 처리 -> 소요시간median: 1000ms
 *  2) child 6개 + 6개 요청 동시에 6개 처리 -> 소요시간median: 3500ms
 *    - 1초가 아니네... cpu의 한계로 6개 일을 동시에 처리하니 6개가 모두 느렸음.(병목)
 *  3) child 2개 + 6개 요청 동시에 6개 처리 -> 소요시간median: 2200ms
 *    - 평균소요시간이 더 빨라졌다. 최초 2개는 1초소요 / 다음 2개는 2초소요 / 다음 2개는 3초 소요
 *    - 듀얼코어를 적절하게 활용할 수 있게 child 2개를 설정하여 병목없이 처리됨.
 */
