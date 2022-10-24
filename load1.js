import http from "k6/http";
import { sleep, check } from "k6";

export default function (errorRate) {
  const projectsRes = http.get("http://localhost:3000/projects");
  check(
    projectsRes,
    {
      "project status is 200": (r) => r.status === 200,
    } || errorRate.add(1)
  );

  const todoStatuses = http.get("http://localhost:3000/todos/statuses");
  check(
    todoStatuses,
    {
      "todo status is 200": (r) => r.status === 200,
    } || errorRate.add(1)
  );
}
