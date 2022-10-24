import http from "k6/http";
import { group, sleep } from "k6";

export const options = {
  thresholds: {
    http_req_failed: ["rate<0.01"], // http errors should be less than 1%
    "group_duration{group:::individualGroup}": ["avg < 400"],
    "group_duration{group:::batchGroup}": ["avg < 200"],
  },
  vus: 1,
  duration: "10s",
};

export default function () {
  group("individualGroup", function () {
    http.get("http://localhost:3000/projects");
    http.get("http://localhost:3000/todos/statuses");
  });

  group("batchGroup", function () {
    http.batch([
      ["GET", `http://localhost:3000/users`],
      ["GET", `http://localhost:3000/users/1`],
      ["GET", `http://localhost:3000/users/2`],
    ]);
  });
}
