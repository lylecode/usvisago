import ky from "ky";

const api = ky.create({
  stringifyJson: (data) =>
    JSON.stringify(data, (key, value) => {
      if (key.endsWith("date")) {
        console.log("=======", value);
        return value;
        //return DateTime.fromISO(value).toSeconds();
      }

      return value;
    }),
});

export default api;
