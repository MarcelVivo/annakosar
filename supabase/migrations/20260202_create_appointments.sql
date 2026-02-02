CREATE TABLE public.appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL,
  time time NOT NULL,
  type text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);
