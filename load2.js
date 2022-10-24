import http from "k6/http";
import { sleep, check } from "k6";

export default function (errorRate) {
  const usersRes = http.get("http://localhost:3000/users");
  check(
    usersRes,
    {
      "user status is 200": (r) => r.status === 200,
    } || errorRate.add(1)
  );
}
