class MyPromise {
  thens = [];
  catchCode;
  finallyCode;
  constructor(executer) {
    //
    // (res, rej) => {
    //     setTimeout(() => {
    //       res(1);
    //     });
    //   }
    executer(this.execThenBlock, this.execCatchCode);
  }

  execThenBlock = (val) => {
    this.thens.forEach((callback) => {
      callback(val);
    });
    this.finallyCode?.();
  };

  execCatchCode = (reason) => {
    this.catchCode(reason);
    this.finallyCode?.();
  };
  then(cb) {
    this.thens.push(cb);
    return this;
  }

  catch(cb) {
    this.catchCode = cb;
    return this;
  }

  finally(cb) {
    this.finallyCode = cb;
    return this;
  }
}

function network() {
  return new MyPromise((res, rej) => {
    setTimeout(() => {
      res(1);
    }, 1000);
  });
}

function run() {
  network()
    .then((res) => {
      console.log("then1!" + res);
    })
    .then((_) => {
      console.log("then2!");
    });
  // .catch((reason) => {
  //   console.log("failed to finishe!");
  // })
  // .finally(() => console.log("finally"));
}

run();

// setTimeout(() => console.log("set timeout"));
// process.nextTick(() => console.log("next tick"));
// queueMicrotask(() => console.log("queue micro task"));
// setImmediate(() => console.log("set immidate"));
// const x = Promise.resolve(1);
// x.then((x) => console.log(x));
// x.then((x) => console.log(x + 1));
// console.log(111);

// Promise.all = function promiseAllReduce(values) {
//   return values.reduce(
//     (acc, val) => {
//       return acc.then((results) => {
//         return Promise.resolve(val).then((result) => {
//           return [...results, result];
//         });
//       });
//     },
//     [Promise.resolve([])]
//   );
// };

// const x = Promise.resolve(1);
// const y = Promise.resolve(2);

// console.log(Promise.all([x, y]));

// Promise.all = function promiseAllIterative(values) {
//   let results = [];
//   let completed = 0;
//   return new Promise((res, rej) => {
//     values.forEach((val, idx) => {
//       return Promise.resolve(val)
//         .then((result) => {
//           results[idx] = result;
//           completed += 1;

//           if (completed === values.length) {
//             res(results);
//           }
//         })
//         .catch((err) => rej(err));
//     });
//   });
// };
