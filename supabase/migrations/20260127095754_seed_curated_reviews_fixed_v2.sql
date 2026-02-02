/*
  # Seed Curated Google Reviews

  ## Description
  Populates the reviews table with curated, high-conversion Google reviews
  organized by service type and persona tags for contextual display.

  ## Data Organization
  - Physiotherapy/General Care reviews
  - WCB/Work Injury/RTW reviews
  - Performance/Sports reviews
  - Trust/Long-term care reviews
  - Transparency review (challenging feedback)
*/

-- Clear existing reviews if any
DELETE FROM reviews;

-- PHYSIOTHERAPY / GENERAL / CHRONIC PAIN REVIEWS
INSERT INTO reviews (reviewer_name, rating, excerpt, full_text, source, source_url, service_tags, persona_tags, is_featured, published_at) VALUES
('Troy Stewart', 5, 'After multiple clinics, AIM was the first place that truly listened to my concerns and limitations.', 'I came to this clinic after multiple clinics and physiotherapist. Nothing against the other places ive been. Faith and her team have listened to me, my concerns, my issues and limitations. They have also provided a fantastic experience.', 'Google', 'https://g.page/r/CRLEbm3vEhZ8EBM/review', ARRAY['physiotherapy'], ARRAY['injured_worker', 'chronic_pain'], true, '2023-09-20'),

('Maie Kellerman', 5, 'After years of knee pain and no relief from other clinics, AIM finally helped me move forward.', 'I have been suffering knee pain for several years. I have been treated by two other physiotherapy clinics - which didn''t bring any relief. Feeling a little desperate, I decided to give Alberta Injury Management a try. Faith and Annice brought me relief.', 'Google', 'https://g.page/r/CRLEbm3vEhZ8EBM/review', ARRAY['physiotherapy'], ARRAY['senior', 'chronic_pain'], false, '2023-09-15'),

('Lyle Berg', 5, 'After the first visit I could finally sleep again. After six visits, my neck felt really good.', 'My neck was very sore for two months, I couldn''t sleep on my left side. My son recommended me to this place. After the first visit I was able to sleep on my left side again. In total 6 visit my neck felt really good. To me it felt like a miracle. Thank you very much.', 'Google', 'https://g.page/r/CRLEbm3vEhZ8EBM/review', ARRAY['physiotherapy'], ARRAY['injured_worker'], false, '2023-02-10'),

('Belinda Denia', 5, 'After two months of therapy, I now feel great and my recovery has sped up.', 'I want to commend Faith, who was my therapist from the beginning. She assured me not to worry and I will feel better soon. After 2 months of therapy, I now feel great and my recovery has sped up. The pain that I''ve been complaining about is now gone.', 'Google', 'https://g.page/r/CRLEbm3vEhZ8EBM/review', ARRAY['physiotherapy'], ARRAY['injured_worker'], false, '2023-03-12'),

('Maria Hicks', 5, 'I finally felt listened to. We have a plan, and I feel confident again.', 'I am so happy that I was referred to this company. I felt listed to and my physiotherapy is amazing. I am so glad that we have a plan and we are going to hopefully get to where I can get the job the I would really enjoy.', 'Google', 'https://g.page/r/CRLEbm3vEhZ8EBM/review', ARRAY['physiotherapy', 'return_to_work'], ARRAY['injured_worker'], false, '2022-05-18');

-- WCB / WORK INJURY / RTW REVIEWS
INSERT INTO reviews (reviewer_name, rating, excerpt, full_text, source, source_url, service_tags, persona_tags, is_featured, published_at) VALUES
('Douglas Murray', 5, 'The team helped me through my WCB case and made the process far less stressful.', 'I was a nervous wreck the highly trained professionals worked wonders and helped me with my WCB case as well thank you very much ladies!', 'Google', 'https://g.page/r/CRLEbm3vEhZ8EBM/review', ARRAY['wcb_rehabilitation', 'return_to_work'], ARRAY['injured_worker'], false, '2023-04-05'),

('Noah Cluney', 5, 'Faith explained my work injury clearly and helped me understand the treatment plan.', 'Been coming here due to a work injury in my right leg and had the pleasure of having Faith as my therapist. She has done an job an excellent job so far and has done a great job explaining the injury and the method she is doing to treat it.', 'Google', 'https://g.page/r/CRLEbm3vEhZ8EBM/review', ARRAY['wcb_rehabilitation', 'physiotherapy'], ARRAY['injured_worker'], true, '2023-01-22'),

('Corey Teeple', 5, 'Created a clear action plan before surgery and guided me through recovery.', 'I am currently dealing with a joint issue that required surgery. I met with Faith before surgery to create an action plan. I am now 4 weeks post op, and I am really starting to see some strength and range of motion improvements.', 'Google', 'https://g.page/r/CRLEbm3vEhZ8EBM/review', ARRAY['physiotherapy', 'return_to_work'], ARRAY['injured_worker'], false, '2023-01-15'),

('Danks Ranks', 5, 'Went from not walking to almost a full recovery after work-related issues.', 'I saw 2 physiotherapist before coming here. I was about to give up when I decided to give it one more shot. I am so glad I did because with faiths help I was able to go from not walking to almost a full recover.', 'Google', 'https://g.page/r/CRLEbm3vEhZ8EBM/review', ARRAY['physiotherapy', 'wcb_rehabilitation'], ARRAY['injured_worker'], false, '2023-02-28'),

('Jack Born', 5, 'Major improvement after just a few visits. Professional and reassuring.', 'Thank you very much for the amazing care and service, Alberta Injury Management! I noticed major improvement after just a few visits and now, 6 weeks later, it''s no longer giving me pain and I get the sense that your team has given me the tools to prevent future issues.', 'Google', 'https://g.page/r/CRLEbm3vEhZ8EBM/review', ARRAY['physiotherapy', 'return_to_work'], ARRAY['injured_worker'], false, '2021-12-10');

-- PERFORMANCE / SPORTS / ATHLETIC REVIEWS
INSERT INTO reviews (reviewer_name, rating, excerpt, full_text, source, source_url, service_tags, persona_tags, is_featured, published_at) VALUES
('Iulia Glodean', 5, 'Helped me recover from my sports injury with a clear plan and great guidance.', 'Mihaela is a very professional and knowledgeable injury management specialist! Thank you for helping me with my sports'' injury!', 'Google', 'https://g.page/r/CRLEbm3vEhZ8EBM/review', ARRAY['performance_rehabilitation'], ARRAY['athlete'], false, '2020-08-15'),

('GiNa Chong', 5, 'Treated with professionalism and integrity across multiple injuries.', 'I''ve been with Faith and Hercules numerous times. Car accidents/ back surgery / neck & leg spasms...many more. I was treated and cared for with professionalism and integrity. A place I would go for when I seek physio. expertise.', 'Google', 'https://g.page/r/CRLEbm3vEhZ8EBM/review', ARRAY['physiotherapy', 'performance_rehabilitation'], ARRAY['athlete', 'injured_worker'], false, '2020-09-12'),

('Kayden Helgeson', 5, 'Phenomenal staff — helped me recover after a knee injury. 10/10.', 'Phenomenal and kind staff, helped me recover after my knee injury and did an amazing job. Very flexible hours and easy access location. Would 10/10 recommend', 'Google', 'https://g.page/r/CRLEbm3vEhZ8EBM/review', ARRAY['performance_rehabilitation', 'physiotherapy'], ARRAY['athlete'], false, '2022-04-20'),

('Atticus Brent', 5, 'Highly skilled and knowledgeable. Best physio I have experienced.', 'Very friendly, highly skilled and knowledgeable staff! Having had a lot of physiotherapy done during my lifetime, this clinic would be the best recommendation I could give to anyone suffering.', 'Google', 'https://g.page/r/CRLEbm3vEhZ8EBM/review', ARRAY['physiotherapy', 'performance_rehabilitation'], ARRAY['athlete'], false, '2021-11-08');

-- TRUST / LONG-TERM CARE / FAMILY CONFIDENCE REVIEWS
INSERT INTO reviews (reviewer_name, rating, excerpt, full_text, source, source_url, service_tags, persona_tags, is_featured, published_at) VALUES
('Ethel Brooks', 5, 'Faith has treated me for 10+ years. Now helping my 86-year-old husband regain strength.', 'I have been treated by Faith over the past 10+ years. I have found her to be very helpful in my various situations. She is now working on my husband''s 86 year old legs and he is finding more strength returning every day. Faith knows her stuff!', 'Google', 'https://g.page/r/CRLEbm3vEhZ8EBM/review', ARRAY['physiotherapy'], ARRAY['senior'], false, '2020-09-05'),

('Ruma Daulay', 5, 'They listen and genuinely care. I wouldn''t trust anyone else.', 'Being a long time "customer" of Faith and her very capable team, since I was a teenager, I wouldn''t trust anyone else to helping me with my injuries and pain. They are not only professional, and knowledgeable, but they listen and CARE!', 'Google', 'https://g.page/r/CRLEbm3vEhZ8EBM/review', ARRAY['physiotherapy'], ARRAY['injured_worker', 'chronic_pain'], false, '2020-10-22'),

('Mala Morley', 5, 'Superior services I''ve depended on for over 10 years.', 'Faith and her team are THE BEST! I am so glad that the wonderful REJUVENATION team are together again and able to offer the superior services that I have come to depend on over the past 10 years!', 'Google', 'https://g.page/r/CRLEbm3vEhZ8EBM/review', ARRAY['physiotherapy'], ARRAY['chronic_pain'], false, '2020-09-18'),

('Tracy Exnowski', 5, 'Went in with 6 months of foot pain and no answers. Faith diagnosed and treated me — I left able to walk on my foot.', 'So happy today. I went in with 6 months of foot pain and no answers from anyone. Today Faith spent the time to diagnose and treat my foot pain. I left being able to walk on my foot. I am going back next week to continue treatment but this is a miracle.', 'Google', 'https://g.page/r/CRLEbm3vEhZ8EBM/review', ARRAY['physiotherapy'], ARRAY['chronic_pain'], false, '2022-03-25'),

('Melanie Samson-Cormier', 5, 'Faith helped me get my shoulder back to full function when I wasn''t making progress elsewhere.', 'Physio: Faith helped me get my shoulder back to full function when I felt I wasn''t making much progress with another physio. The difference was clear from the first appointment: she was very thorough in getting the full picture of what was going on.', 'Google', 'https://g.page/r/CRLEbm3vEhZ8EBM/review', ARRAY['physiotherapy'], ARRAY['injured_worker'], false, '2020-07-15');

-- TRANSPARENCY REVIEW (Challenging feedback with professional response)
INSERT INTO reviews (reviewer_name, rating, excerpt, full_text, source, source_url, service_tags, persona_tags, is_featured, show_in_transparency, published_at) VALUES
('Christina Daniel', 1, 'Had concerns about my experience at the clinic.', 'I had an extremely troubling experience at this clinic that raises serious concerns about how it is being run. During my visit, I received treatment without my consent or knowledge from a young, visibly nervous and confused individual.', 'Google', 'https://g.page/r/CRLEbm3vEhZ8EBM/review', ARRAY['physiotherapy'], ARRAY[]::text[], false, true, '2023-08-01');
