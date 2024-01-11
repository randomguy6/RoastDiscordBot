const fs = require("fs");
const csv = require("csv-parser");

const fileName = "./resources/insults.csv";

const replies = [];

fs.createReadStream(fileName)
  .pipe(csv())
  .on("data", (row) => {
    // Assuming there is only one column in your CSV file
    const columnValue = row[Object.keys(row)[0]];
    replies.push(columnValue);
  })
  .on("end", () => {
    console.log("CSV file successfully processed.");
    console.log("Array of strings:", replies);
  })
  .on("error", (error) => {
    console.error("Error reading CSV file:", error.message);
  });

const getStupidReply = () => {
  let i = Math.floor(Math.random() * replies.length);
  return replies[i];
};

const addStupidReply = (reply) => {
  replies.push(reply);

  const csvContent = "Indents\n" + replies.join("\n");

  // Write the CSV-formatted string to the file
  fs.writeFile(fileName, csvContent, (err) => {
    if (err) {
      console.error("Error writing to CSV file:", err.message);
    } else {
      console.log("CSV file successfully created:", fileName);
      console.log(`New values are: ${csvContent}`)
    }
  });
};

module.exports = {
  getStupidReply: getStupidReply,
  addStupidReply: addStupidReply,
};
