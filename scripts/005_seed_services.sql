-- Seed services table with Glide Network services
insert into public.services (name, description, category, price_info, icon) values
('City Rides', 'Fast, safe, and reliable movement across Lagos through trained riders and verified operators', 'mobility', 'Starting from ₦500', 'car'),
('Market Runs', 'Professional market agents who help you shop for fresh groceries, bulk items, and essentials — delivered straight to your doorstep', 'shopping', 'Variable pricing', 'shopping-cart'),
('On-Demand Errands', 'Pickups, drop-offs, store-to-home delivery, small parcel movement, and personal errands', 'delivery', 'Variable pricing', 'package'),
('Premium Mobility', 'High-end ride services with upgraded comfort, priority access, and dedicated riders', 'vip', 'Starting from ₦2000', 'crown'),
('Event Mobility Support', 'Coordinated transportation and logistics for events, group outings, and tourism activities', 'events', 'Custom pricing', 'calendar')
on conflict do nothing;
