//Middleware global (exemplo)
export default (req, res, next) => {
  console.time("Request");

  console.log(`Método: ${req.method} - `, `URL: ${req.url}`);

  next();

  console.timeEnd("Request"); // loga tempo decorrido desde console.time
}