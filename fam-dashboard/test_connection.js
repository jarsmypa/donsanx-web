
import { createClient } from '@supabase/supabase-js';

// Hardcoded from .env for the test script
const supabaseUrl = 'https://pxndaqhufzodiuyfbtcw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4bmRhcWh1ZnpvZGl1eWZidGN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NjY2MTEsImV4cCI6MjA4NjE0MjYxMX0.Qy65S7BG5h59op01Xqe4MK4ZA8MzvjzQ0DaY_d3GrDc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log("Probando conexión a Supabase...");

    const { data, error } = await supabase
        .from('profiles')
        .select('*');

    if (error) {
        console.error("❌ Error conectando:", error);
    } else {
        console.log("✅ Conexión exitosa. Datos encontrados:");
        console.log(JSON.stringify(data, null, 2));
    }
}

testConnection();
