import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fonkootdsjrdykzuxxpd.supabase.co';


const supabaseKey = 'sb_publishable_ddQK6MRc7uk2uukweJnzKw_oOXbKG-C';

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);