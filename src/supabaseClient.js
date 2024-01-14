import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zbpyozdrtciyxzjlxkyq.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpicHlvemRydGNpeXh6amx4a3lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3MTM4MjksImV4cCI6MjAxMTI4OTgyOX0.Q6EKJGOQ9c3cLxF216L6dZZgfCKrqpP7t1xhp6IzpmI";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;