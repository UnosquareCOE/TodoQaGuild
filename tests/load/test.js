import http from "k6/http";
import { sleep, check } from "k6";
import { Rate } from "k6/metrics";

export const errorRate = new Rate("errors");

export const options = {
  vus: 10,
  duration: "30s",
};
export default function () {
  const res = http.get("http://localhost:3000/projects");
  const checkRes = check(
    res,
    {
      "status is 200": (r) => r.status === 200,
    } || errorRate.add(1)
  );
}
