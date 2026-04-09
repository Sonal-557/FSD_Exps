const fs = require('fs').promises;
const readline = require('readline');

// Create interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Helper function for input
const ask = (question) => {
    return new Promise(resolve => rl.question(question, resolve));
};

// Main menu function
async function menu() {
    while (true) {
        console.log(`
===============================
      📁 FILE OPERATIONS MENU
===============================
1. Create & Write File
2. Append Data
3. Read File
4. Rename File
5. Delete File
6. Exit
===============================
        `);

        const choice = await ask("Enter your choice: ");

        try {
            switch (choice) {

                case '1': {
                    const data = await ask("Enter content to write: ");
                    await fs.writeFile('data.txt', data + "\n");
                    console.log("✅ File created & data written successfully.\n");
                    break;
                }

                case '2': {
                    const data = await ask("Enter content to append: ");
                    await fs.appendFile('data.txt', data + "\n");
                    console.log("✅ Data appended successfully.\n");
                    break;
                }

                case '3': {
                    const data = await fs.readFile('data.txt', 'utf8');
                    console.log("\n📄 File Content:\n" + data + "\n");
                    break;
                }

                case '4': {
                    const newName = await ask("Enter new file name: ");
                    await fs.rename('data.txt', newName);
                    console.log("✅ File renamed successfully.\n");
                    break;
                }

                case '5': {
                    await fs.unlink('data.txt');
                    console.log("🗑️ File deleted successfully.\n");
                    break;
                }

                case '6': {
                    console.log("👋 Exiting...");
                    rl.close();
                    return;
                }

                default:
                    console.log("❌ Invalid choice. Try again.\n");
            }
        } catch (err) {
            console.log("⚠️ Error:", err.message, "\n");
        }
    }
}

// Run program
menu();