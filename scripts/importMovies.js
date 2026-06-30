import fs from "fs";
import csv from "csv-parser";
import { prisma } from "../src/prisma.js";
const results = []
const yesWatch = []
fs.createReadStream("./movies.csv")
.pipe(csv())
.on("data", (data) => results.push(data))
.on("end", async () => {
    for (let m = 0; m < results.length; m++) {
        const row = results[m]
        const myTags = []
        for (const tag of [row.tagA, row.tagB, row.tagC, row.tagD, row.tagE, row.tagF, row.tagG]) {
            if (tag != '') {
                myTags.push(tag);
            }
        }
        try {
            await prisma.movie.create({
                data: {
                    movie: row.movie,
                    year: Number(row.year),
                    director: row.director || null,
                    watched: row.watched === "yes",
                    era: row.era || null,
                    franchise: row.franchise || null,
                    tags: myTags,
                    actors: row.actors ? row.actors.split(",") : [],
                    trailer: row.trailer || null,
                    comment: row.comment || null,
                    rating: row.rating ? Number(row.rating) : null,
                }
            })
        } catch (err) {
            console.log('SKIPPED')
        }
    }
    process.exit();
})

// node scripts/importMovies.js