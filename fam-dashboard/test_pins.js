
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Hardcoded from .env
const supabaseUrl = 'https://pxndaqhufzodiuyfbtcw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4bmRhcWh1ZnpvZGl1eWZidGN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NjY2MTEsImV4cCI6MjA4NjE0MjYxMX0.Qy65S7BG5h59op01Xqe4MK4ZA8MzvjzQ0DaY_d3GrDc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function getPins() {
    console.log("Consultando pines...");
    const { data, error } = await supabase
        .from('profiles')
        .select('name, pin')
        .order('name');

    if (error) {
        fs.writeFileSync('pins.txt', `Error: ${error.message}`);
    } else {
        let output = "--- LISTA DE USUARIOS Y PINES ---\n";
        data.forEach(user => {
            output += `Usuario: ${user.name} | PIN: ${user.pin}\n`;
        });
        output += "---------------------------------\n";
        fs.writeFileSync('pins.txt', output);
        console.log("Datos guardados en pins.txt");
    }
}

getPins();
