import app from "./app.js";
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Lurid Origins Backed API is running on: ${PORT}`);
});