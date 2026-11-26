// ============================================================================
// VolMusCo Project Page Configuration & Curated Media Manifest
// ============================================================================

window.VOLMUSCO_CONFIG = {
  demoGalleryBase: 'https://volumuscle-motion-gallery.fond-gem-1252.chatgpt.site',
  meshInspectorBase: 'https://motion.dinghub.site',
  links: {
    paperPdf: './paper/VolMusCo_arxiv.pdf?v=2',
    code: 'https://github.com/InckieUltra/VolMusCo'
  },
  heroTeaser: {
    poster: './assets/figures/hero_teaser_poster.jpg?v=2',
    video: './media/hero_teaser_1080p.mp4?v=2'
  },
  featuredVideo: {
    poster: './assets/figures/full_video_poster.jpg?v=14',
    video: './media/VolMusCo_full_1080p.mp4?v=14',
    chapterGroups: [
      {
        label: 'Overview & Tracking',
        items: [
          { time: 0, label: 'Intro' },
          { time: 10, label: 'Method Overview' },
          { time: 55, label: 'LaFAN1 Tracking' },
          { time: 64, label: 'Strength Training' },
          { time: 80, label: 'Barbell Deadlift' },
          { time: 95, label: 'Tennis' },
          { time: 106, label: 'Carrying a Box' },
          { time: 112, label: 'Three-Ball Juggling' },
          { time: 117, label: 'Sword & Shield' },
          { time: 126, label: 'Human Video Pose' }
        ]
      },
      {
        label: 'Ablations & Biomechanics',
        items: [
          { time: 132, label: 'Mesh Resolution' },
          { time: 138, label: 'Deformation Feedback' },
          { time: 144, label: 'Actuation Comparison' },
          { time: 164, label: 'Tracking Policy Comparison' },
          { time: 184, label: 'Running with Fatigue' },
          { time: 192, label: 'Muscle Inertia' },
          { time: 200, label: 'Shared Fascia' }
        ]
      }
    ]
  },

  // Interactive Dual-View 9-Tet Coarse Mesh vs. Continuous Surface Inspector (30 fps Blue-to-Red Clips Only)
  inspectorClips: [
    { id: 'lafan30_01', title: 'Expressive Dance (dance2_subject1)', meta: 'LaFAN1 · 10.0 s · 30 fps', fps: 30, version: 'cc50693d3286' },
    { id: 'lafan30_02', title: 'Martial Arts Combat (fight1_subject3)', meta: 'LaFAN1 · 12.2 s · 30 fps', fps: 30, version: '78036ac3ff38' },
    { id: 'lafan30_08', title: 'High-Speed Sprint (sprint1_subject2)', meta: 'LaFAN1 · 12.2 s · 30 fps', fps: 30, version: '1c03d6762422' },
    { id: 'lafan30_04', title: 'Dynamic Jumps (jumps1_subject1)', meta: 'LaFAN1 · 12.2 s · 30 fps', fps: 30, version: '72b62c160797' },
    { id: 'backflip_g58k', title: 'Acrobatic Backflip', meta: 'Skill · 2.2 s · 30 fps', fps: 30, version: '36765e629863' },
    { id: 'lafan30_03', title: 'Sports & Combat Agility (fightAndSports1)', meta: 'LaFAN1 · 12.2 s · 30 fps', fps: 30, version: '9c34e0a9c9d7' },
    { id: 'lafan30_07', title: 'Steady Running (run2_subject4)', meta: 'LaFAN1 · 12.2 s · 30 fps', fps: 30, version: '5d4e4d47c71b' },
    { id: 'lafan30_12', title: 'Natural Walking & Turn (walk3_subject2)', meta: 'LaFAN1 · 12.2 s · 30 fps', fps: 30, version: '0ee70027f9e6' },
    { id: 'lafan30_06', title: 'Multi-Action Transition (multipleActions1)', meta: 'LaFAN1 · 12.2 s · 30 fps', fps: 30, version: '4b34338aa36e' },
    { id: 'lafan30_10', title: 'Push & Stumble Recovery (pushAndStumble1)', meta: 'LaFAN1 · 12.2 s · 30 fps', fps: 30, version: 'cf163702a6fd' },
    { id: 'lafan30_13', title: 'Aiming Stance & Sidestep (aiming2_subject2)', meta: 'LaFAN1 · 12.2 s · 30 fps', fps: 30, version: '812a4b7fa754' }
  ],

  // 49 Closed-Loop Blue-to-Red Activation Policy Demos (3-Column Grid Ready)
  galleryCards: [
    // --- Props, Weapons, Strength & Sport Skills (17) ---
    {
      id: 'tennis_2hit_adjusted',
      featured: true,
      category: 'props',
      badge: 'Sport · Ball Interaction',
      title: 'Tennis Rally · Two Consecutive Returns',
      desc: 'Closed-loop swing tracking with a 0.32 kg racket fixed to the right hand, intercepting and returning two incoming balls.',
      type: 'single',
      poster: '/media/tennis-side17/tennis-side-low.jpg',
      video: '/media/tennis-side17/tennis-side-low.mp4',
      variants: [
        { label: 'Low Side · Rally', poster: '/media/tennis-side17/tennis-side-low.jpg', video: '/media/tennis-side17/tennis-side-low.mp4' },
        { label: 'Full Trajectory', poster: '/media/tennis-side17/tennis-side-low-full.jpg', video: '/media/tennis-side17/tennis-side-low-full.mp4' },
        { label: 'Muscle Close-up', poster: '/media/recorded8-22k/tennis_2hit_far.jpg', video: '/media/recorded8-22k/tennis_2hit_far.mp4' }
      ]
    },
    {
      id: 'sword_shield_combo',
      featured: true,
      category: 'props',
      badge: 'Props · 4.8 kg Total',
      title: 'Sword & Shield · Four-Strike Combo',
      desc: 'Retargeted combat sequence carrying a 1.8 kg sword (right hand) and 3.0 kg shield (left hand) with coupled inertia.',
      type: 'single',
      poster: '/media/recorded8-22k/sword_shield_combo.jpg',
      video: '/media/recorded8-22k/sword_shield_combo.mp4'
    },
    {
      id: 'training-bardead',
      featured: true,
      category: 'props',
      badge: 'Strength · Multi-Load',
      title: 'Barbell Deadlift · Progressive Loads',
      desc: 'Two-hand welded grip transferring load across upper and lower body musculature under 40 kg, 60 kg, and 80 kg barbells.',
      type: 'single',
      poster: '/media/root-locked/bar40.jpg',
      video: '/media/root-locked/bar40.mp4',
      variants: [
        { label: '40 kg', poster: '/media/root-locked/bar40.jpg', video: '/media/root-locked/bar40.mp4' },
        { label: '60 kg', poster: '/media/root-locked/bar60.jpg', video: '/media/root-locked/bar60.mp4' },
        { label: '80 kg', poster: '/media/root-locked/bar80.jpg', video: '/media/root-locked/bar80.mp4' }
      ]
    },
    {
      id: 'final-20261115-juggling_3ball',
      featured: true,
      category: 'props',
      badge: 'Dexterous Timing',
      title: 'Three-Ball Juggling · MLP vs. Transformer',
      desc: 'Rhythmic three-ball cascade (0.08 kg per ball) comparing our default MLP actor (10.55 mm MPJPE) against Transformer.',
      type: 'single',
      poster: '/media/juggling-muscles/mlp.jpg',
      video: '/media/juggling-muscles/mlp.mp4',
      variants: [
        { label: 'MLP (Ours)', poster: '/media/juggling-muscles/mlp.jpg', video: '/media/juggling-muscles/mlp.mp4' },
        { label: 'Transformer', poster: '/media/juggling-muscles/transformer.jpg', video: '/media/juggling-muscles/transformer.mp4' }
      ]
    },
    {
      id: 'training-dbdead',
      featured: true,
      category: 'props',
      badge: 'Strength · Dumbbells',
      title: 'Dual Dumbbell Deadlift · 24 & 44 kg',
      desc: 'Symmetric hip-hinge lifting with independent 12 kg or 22 kg dumbbells attached to each hand.',
      type: 'single',
      poster: '/media/root-locked/db12.jpg',
      video: '/media/root-locked/db12.mp4',
      variants: [
        { label: '12 kg / hand', poster: '/media/root-locked/db12.jpg', video: '/media/root-locked/db12.mp4' },
        { label: '22 kg / hand', poster: '/media/root-locked/db22.jpg', video: '/media/root-locked/db22.mp4' }
      ]
    },
    {
      id: 'katana',
      featured: true,
      category: 'props',
      badge: 'Weapon · 1.0 kg',
      title: 'Katana · Multi-Directional Slash Combo',
      desc: 'Rapid upper-body torso rotation and weapon deceleration driven by volumetric trunk and shoulder muscles.',
      type: 'single',
      poster: '/media/root-locked/katana.jpg',
      video: '/media/root-locked/katana.mp4'
    },
    {
      id: 'training-kbdead',
      featured: false,
      category: 'props',
      badge: 'Strength · Kettlebell',
      title: 'Two-Hand Kettlebell Lift · 12 & 20 kg',
      desc: 'Full-body squat-to-stand lifting with shared two-hand load conditioning in the policy and world model.',
      type: 'single',
      poster: '/media/root-locked/kb12.jpg',
      video: '/media/root-locked/kb12.mp4',
      variants: [
        { label: '12 kg', poster: '/media/root-locked/kb12.jpg', video: '/media/root-locked/kb12.mp4' },
        { label: '20 kg', poster: '/media/root-locked/kb20.jpg', video: '/media/root-locked/kb20.mp4' }
      ]
    },
    {
      id: 'training-curl',
      featured: false,
      category: 'props',
      badge: 'Strength · Upper Limb',
      title: 'Dual Dumbbell Biceps Curl (2 × 5 kg)',
      desc: 'Controlled elbow flexion under handheld 5 kg loads highlighting biceps brachii and forearm recruitment.',
      type: 'single',
      poster: '/media/root-locked/curl5.jpg',
      video: '/media/root-locked/curl5.mp4'
    },
    {
      id: 'liuyedao',
      featured: false,
      category: 'props',
      badge: 'Weapon · 1.2 kg',
      title: 'Saber (Liuyedao) · Figure-Eight Flourish',
      desc: 'Continuous circular wrist and shoulder coordination carrying a 1.2 kg curved blade.',
      type: 'single',
      poster: '/media/root-locked/liuyedao.jpg',
      video: '/media/root-locked/liuyedao.mp4'
    },
    {
      id: 'fantasy_sword',
      featured: false,
      category: 'props',
      badge: 'Weapon · 1.8 kg',
      title: 'Heavy Greatsword · Diagonal Cleave',
      desc: 'High-moment-of-inertia 1.8 kg blade swings requiring whole-body counterbalance.',
      type: 'single',
      poster: '/media/root-locked/fantasy_sword.jpg',
      video: '/media/root-locked/fantasy_sword.mp4'
    },
    {
      id: 'stone_hammer',
      featured: false,
      category: 'props',
      badge: 'Tool · 0.9 kg',
      title: 'Stone Hammer · Overhead Lift & Strike',
      desc: 'Vertical lifting and downward striking motion with distal tool mass.',
      type: 'single',
      poster: '/media/root-locked/stone_hammer.jpg',
      video: '/media/root-locked/stone_hammer.mp4'
    },
    {
      id: 'hatchet',
      featured: false,
      category: 'props',
      badge: 'Tool · 0.75 kg',
      title: 'Hatchet · Diagonal Chopping Sequence',
      desc: 'Cross-body chopping motion with repeated direction reversals.',
      type: 'single',
      poster: '/media/root-locked/hatchet.jpg',
      video: '/media/root-locked/hatchet.mp4'
    },
    {
      id: 'racket',
      featured: false,
      category: 'props',
      badge: 'Sport · 0.32 kg',
      title: 'Sport Racket · Forehand & Backhand',
      desc: 'Continuous forehand-to-backhand weight transfer and trunk rotation.',
      type: 'single',
      poster: '/media/root-locked/racket.jpg',
      video: '/media/root-locked/racket.mp4'
    },
    {
      id: 'sword_shield_block',
      featured: false,
      category: 'props',
      badge: 'Props · Sword & Shield',
      title: 'Sword & Shield · Shield Raise & Guard',
      desc: 'Defensive stance holding a 3.0 kg shield aloft while maintaining balance.',
      type: 'single',
      poster: '/media/recorded8-22k/sword_shield_block.jpg',
      video: '/media/recorded8-22k/sword_shield_block.mp4'
    },
    {
      id: 'sword_shield_downcut',
      featured: false,
      category: 'props',
      badge: 'Props · Sword & Shield',
      title: 'Sword & Shield · Overhead Slash',
      desc: 'Committed forward slash under asymmetric left/right hand inertia.',
      type: 'single',
      poster: '/media/recorded8-22k/sword_shield_downcut.jpg',
      video: '/media/recorded8-22k/sword_shield_downcut.mp4'
    },
    {
      id: 'sword_shield_retreat',
      featured: false,
      category: 'props',
      badge: 'Props · Sword & Shield',
      title: 'Sword & Shield · Evasive Retreat',
      desc: 'Backward stepping transition while stabilizing sword and shield.',
      type: 'single',
      poster: '/media/recorded8-22k/sword_shield_retreat.jpg',
      video: '/media/recorded8-22k/sword_shield_retreat.mp4'
    },
    {
      id: 'sword_shield_thrust',
      featured: false,
      category: 'props',
      badge: 'Props · Sword & Shield',
      title: 'Sword & Shield · Forward Thrust',
      desc: 'Rapid forward lunge and recovery with blade-tip tracking.',
      type: 'single',
      poster: '/media/recorded8-22k/sword_shield_thrust.jpg',
      video: '/media/recorded8-22k/sword_shield_thrust.mp4'
    },

    // --- Motion Tracking: Acrobatic, Dance, Martial Arts & LaFAN1 (25) ---
    {
      id: 'backflip_g58k',
      featured: true,
      category: 'tracking',
      badge: 'Acrobatics · CMU MoCap',
      title: 'Standing Backflip (CMU 88_05)',
      desc: 'Explosive aerial rotation and two-foot landing driven by 284 two-way coupled volumetric muscles.',
      type: 'single',
      poster: '/media/backflip-fixed/cmu-88-05-17400.jpg',
      video: '/media/backflip-fixed/cmu-88-05-17400.mp4',
      variants: [
        { label: 'Front Camera', poster: '/media/backflip-fixed/cmu-88-05-17400.jpg', video: '/media/backflip-fixed/cmu-88-05-17400.mp4' },
        { label: 'Side Camera', poster: '/media/backflip-fixed/cmu-88-05-17400-side.jpg', video: '/media/backflip-fixed/cmu-88-05-17400-side.mp4' }
      ]
    },
    {
      id: 'lafan30_01',
      featured: true,
      category: 'tracking',
      badge: 'LaFAN1 · 30 fps',
      title: 'Expressive Dance (dance2_subject1)',
      desc: 'Closed-loop full-body dance tracking with root-following camera and activation-colored musculature.',
      type: 'single',
      poster: '/media/root-locked/lafan30_01.jpg',
      video: '/media/root-locked/lafan30_01.mp4'
    },
    {
      id: 'lafan30_02',
      featured: true,
      category: 'tracking',
      badge: 'LaFAN1 · 30 fps',
      title: 'Martial Arts Combat (fight1_subject3)',
      desc: 'Fast strikes, stances, and rapid weight shifts tracked in closed loop.',
      type: 'single',
      poster: '/media/root-locked/lafan30_02.jpg',
      video: '/media/root-locked/lafan30_02.mp4'
    },
    {
      id: 'lafan30_08',
      featured: true,
      category: 'tracking',
      badge: 'LaFAN1 · 30 fps',
      title: 'High-Speed Sprint (sprint1_subject2)',
      desc: 'Agile sprinting and sharp directional transitions powered by lower-limb volumetric actuation.',
      type: 'single',
      poster: '/media/root-locked/lafan30_08.jpg',
      video: '/media/root-locked/lafan30_08.mp4'
    },
    {
      id: 'lafan30_04',
      featured: true,
      category: 'tracking',
      badge: 'LaFAN1 · 30 fps',
      title: 'Dynamic Jumps (jumps1_subject1)',
      desc: 'Repeated vertical and forward jumps with compliant muscle-driven landings.',
      type: 'single',
      poster: '/media/root-locked/lafan30_04.jpg',
      video: '/media/root-locked/lafan30_04.mp4'
    },
    {
      id: 'lafan30_03',
      featured: false,
      category: 'tracking',
      badge: 'LaFAN1 · 30 fps',
      title: 'Athletic & Combat Mix (fightAndSports1)',
      desc: 'Multi-skill athletic agility and combat footwork on LaFAN1.',
      type: 'single',
      poster: '/media/root-locked/lafan30_03.jpg',
      video: '/media/root-locked/lafan30_03.mp4'
    },
    {
      id: 'lafan30_06',
      featured: false,
      category: 'tracking',
      badge: 'LaFAN1 · 30 fps',
      title: 'Multi-Action Transition (multipleActions1)',
      desc: 'Continuous switching across locomotion, turning, and upper-body gestures.',
      type: 'single',
      poster: '/media/root-locked/lafan30_06.jpg',
      video: '/media/root-locked/lafan30_06.mp4'
    },
    {
      id: 'lafan30_07',
      featured: false,
      category: 'tracking',
      badge: 'LaFAN1 · 30 fps',
      title: 'Steady Running (run2_subject4)',
      desc: 'Cyclic running gait showing alternating stance/swing leg recruitment.',
      type: 'single',
      poster: '/media/root-locked/lafan30_07.jpg',
      video: '/media/root-locked/lafan30_07.mp4'
    },
    {
      id: 'lafan30_09',
      featured: false,
      category: 'tracking',
      badge: 'LaFAN1 · 30 fps',
      title: 'Push & Balance Recovery (pushAndFall1)',
      desc: 'Reactive stepping motion under abrupt momentum shifts.',
      type: 'single',
      poster: '/media/root-locked/lafan30_09.jpg',
      video: '/media/root-locked/lafan30_09.mp4'
    },
    {
      id: 'lafan30_10',
      featured: false,
      category: 'tracking',
      badge: 'LaFAN1 · 30 fps',
      title: 'Push & Stumble Recovery (pushAndStumble1)',
      desc: 'Rapid compensatory stepping to regain upright equilibrium.',
      type: 'single',
      poster: '/media/root-locked/lafan30_10.jpg',
      video: '/media/root-locked/lafan30_10.mp4'
    },
    {
      id: 'lafan30_11',
      featured: false,
      category: 'tracking',
      badge: 'LaFAN1 · 30 fps',
      title: 'Forward Push Motion (push1_subject2)',
      desc: 'Coordinated upper-limb extension and stance bracing.',
      type: 'single',
      poster: '/media/root-locked/lafan30_11.jpg',
      video: '/media/root-locked/lafan30_11.mp4'
    },
    {
      id: 'lafan30_12',
      featured: false,
      category: 'tracking',
      badge: 'LaFAN1 · 30 fps',
      title: 'Natural Walking (walk3_subject2)',
      desc: 'Smooth walking and turning trajectory on flat ground.',
      type: 'single',
      poster: '/media/root-locked/lafan30_12.jpg',
      video: '/media/root-locked/lafan30_12.mp4'
    },
    {
      id: 'lafan30_13',
      featured: false,
      category: 'tracking',
      badge: 'LaFAN1 · 30 fps',
      title: 'Aiming Stance & Sidestep (aiming2)',
      desc: 'Upper-body aiming posture paired with lower-body sidestepping.',
      type: 'single',
      poster: '/media/root-locked/lafan30_13.jpg',
      video: '/media/root-locked/lafan30_13.mp4'
    },
    {
      id: 'lafan30_14',
      featured: false,
      category: 'tracking',
      badge: 'LaFAN1 · 30 fps',
      title: 'Rhythmic Dance (dance1_subject2)',
      desc: 'Full-body rhythmic choreography tracked by volumetric muscles.',
      type: 'single',
      poster: '/media/root-locked/lafan30_14.jpg',
      video: '/media/root-locked/lafan30_14.mp4'
    },
    {
      id: 'lafan30_15',
      featured: false,
      category: 'tracking',
      badge: 'LaFAN1 · 30 fps',
      title: 'Martial Arts Kicks & Punches (fight1_s2)',
      desc: 'High-velocity kicking and punching combinations.',
      type: 'single',
      poster: '/media/root-locked/lafan30_15.jpg',
      video: '/media/root-locked/lafan30_15.mp4'
    },
    {
      id: 'lafan30_16',
      featured: false,
      category: 'tracking',
      badge: 'LaFAN1 · 30 fps',
      title: 'Sports Agility (fightAndSports1_s4)',
      desc: 'Athletic footwork and whole-body coordination.',
      type: 'single',
      poster: '/media/root-locked/lafan30_16.jpg',
      video: '/media/root-locked/lafan30_16.mp4'
    },
    {
      id: 'lafan30_17',
      featured: false,
      category: 'tracking',
      badge: 'LaFAN1 · 30 fps',
      title: 'Hopping & Long Jumps (jumps1_subject2)',
      desc: 'Multi-directional jumping and single-leg landings.',
      type: 'single',
      poster: '/media/root-locked/lafan30_17.jpg',
      video: '/media/root-locked/lafan30_17.mp4'
    },
    {
      id: 'lafan30_19',
      featured: false,
      category: 'tracking',
      badge: 'LaFAN1 · 30 fps',
      title: 'Composite Skill Sequence (multipleActions1)',
      desc: 'Long-horizon sequence spanning diverse locomotion styles.',
      type: 'single',
      poster: '/media/root-locked/lafan30_19.jpg',
      video: '/media/root-locked/lafan30_19.mp4'
    },
    {
      id: 'lafan30_20',
      featured: false,
      category: 'tracking',
      badge: 'LaFAN1 · 30 fps',
      title: 'Curved Running Path (run2_subject1)',
      desc: 'Sustained running with banking turns.',
      type: 'single',
      poster: '/media/root-locked/lafan30_20.jpg',
      video: '/media/root-locked/lafan30_20.mp4'
    },
    {
      id: 'dance60',
      featured: false,
      category: 'tracking',
      badge: 'Extended Rollout',
      title: 'Extended Dance Choreography (dance60)',
      desc: 'Long-duration expressive dance rollout under closed-loop volumetric control.',
      type: 'single',
      poster: '/media/root-locked/dance60.jpg',
      video: '/media/root-locked/dance60.mp4'
    },
    {
      id: 'walk_W3',
      featured: false,
      category: 'tracking',
      badge: 'Locomotion',
      title: 'Steady Gait Showcase (walk_W3)',
      desc: 'Natural human walking cadence with emergent stance/swing leg synergy.',
      type: 'single',
      poster: '/media/root-locked/walk_W3.jpg',
      video: '/media/root-locked/walk_W3.mp4'
    },
    {
      id: 'legacy_dance2',
      featured: false,
      category: 'tracking',
      badge: 'LaFAN1 · Multi-Clip Policy',
      title: 'Dance Sequence (dance2_subject3)',
      desc: 'Evaluated from our 60-clip multi-motion volumetric tracking controller.',
      type: 'single',
      poster: '/media/root-locked/legacy_dance2.jpg',
      video: '/media/root-locked/legacy_dance2.mp4'
    },
    {
      id: 'legacy_fight',
      featured: false,
      category: 'tracking',
      badge: 'LaFAN1 · Multi-Clip Policy',
      title: 'Combat Sequence (fight1_subject5)',
      desc: 'Evaluated from our 60-clip multi-motion volumetric tracking controller.',
      type: 'single',
      poster: '/media/root-locked/legacy_fight.jpg',
      video: '/media/root-locked/legacy_fight.mp4'
    },
    {
      id: 'legacy_fight_and_sports',
      featured: false,
      category: 'tracking',
      badge: 'LaFAN1 · Multi-Clip Policy',
      title: 'Sports & Combat (fightAndSports1_s4)',
      desc: 'Evaluated from our 60-clip multi-motion volumetric tracking controller.',
      type: 'single',
      poster: '/media/root-locked/legacy_fight_and_sports.jpg',
      video: '/media/root-locked/legacy_fight_and_sports.mp4'
    },
    {
      id: 'legacy_push',
      featured: false,
      category: 'tracking',
      badge: 'LaFAN1 · Multi-Clip Policy',
      title: 'Pushing Interaction (push1_subject2)',
      desc: 'Evaluated from our 60-clip multi-motion volumetric tracking controller.',
      type: 'single',
      poster: '/media/root-locked/legacy_push.jpg',
      video: '/media/root-locked/legacy_push.mp4'
    },

    // --- Monocular Video Tracking (4 Closed-Loop Blue-to-Red Demos) ---
    {
      id: 'finetune25k_front_squat_sidekick',
      featured: true,
      category: 'video',
      badge: 'Video Fitness Tracking',
      title: 'Front Squat to Side Kick Sequence',
      desc: 'Deep squat followed by single-leg lateral kick reconstructed from monocular fitness video and tracked in closed loop.',
      type: 'single',
      poster: '/media/shared-scene/finetune25k_front_squat_sidekick-human.jpg',
      video: '/media/shared-scene/finetune25k_front_squat_sidekick-human.mp4',
      variants: [
        { label: 'Human Video', poster: '/media/shared-scene/finetune25k_front_squat_sidekick-human.jpg', video: '/media/shared-scene/finetune25k_front_squat_sidekick-human.mp4' },
        { label: 'IK Reference', poster: '/media/root-locked/finetune25k_front_squat_sidekick.jpg', video: '/media/root-locked/finetune25k_front_squat_sidekick.mp4' }
      ]
    },
    {
      id: 'walk_front_v4',
      featured: false,
      category: 'video',
      badge: 'Monocular Video Tracking',
      title: 'Front-View Walking (1.0× & 1.65× Pace)',
      desc: 'MediaPipe Pose Full landmark estimation + joint-constrained IK tracked in closed loop at nominal and accelerated speeds.',
      type: 'single',
      poster: '/media/recorded8-22k/walk_front-human.jpg',
      video: '/media/recorded8-22k/walk_front-human.mp4',
      variants: [
        { label: '1.0× Human', poster: '/media/recorded8-22k/walk_front-human.jpg', video: '/media/recorded8-22k/walk_front-human.mp4' },
        { label: '1.0× IK', poster: '/media/recorded8-22k/walk_front.jpg', video: '/media/recorded8-22k/walk_front.mp4' },
        { label: '1.65× Human', poster: '/media/recorded8-22k/walk_front_1p65x-human.jpg', video: '/media/recorded8-22k/walk_front_1p65x-human.mp4' },
        { label: '1.65× IK', poster: '/media/recorded8-22k/walk_front_1p65x.jpg', video: '/media/recorded8-22k/walk_front_1p65x.mp4' }
      ]
    },
    {
      id: 'zeroshot_walk_side',
      featured: false,
      category: 'video',
      badge: 'Zero-Shot Video Tracking',
      title: 'Zero-Shot Side-View Walking',
      desc: 'Closed-loop tracking of a pose trajectory reconstructed directly from an unseen monocular video.',
      type: 'single',
      poster: '/media/shared-scene/zeroshot_walk_side-human.jpg',
      video: '/media/shared-scene/zeroshot_walk_side-human.mp4',
      variants: [
        { label: 'Human Video', poster: '/media/shared-scene/zeroshot_walk_side-human.jpg', video: '/media/shared-scene/zeroshot_walk_side-human.mp4' },
        { label: 'IK Reference', poster: '/media/root-locked/zeroshot_walk_side.jpg', video: '/media/root-locked/zeroshot_walk_side.mp4' }
      ]
    },
    {
      id: 'finetune25k_neck_shoulder_mobility',
      featured: false,
      category: 'video',
      badge: 'Video Exercise Tracking',
      title: 'Neck & Shoulder Mobility Routine',
      desc: 'Upper-body mobility exercise reconstructed from monocular video and tracked by volumetric muscles.',
      type: 'single',
      poster: '/media/shared-scene/finetune25k_neck_shoulder_mobility-human.jpg',
      video: '/media/shared-scene/finetune25k_neck_shoulder_mobility-human.mp4',
      variants: [
        { label: 'Human Video', poster: '/media/shared-scene/finetune25k_neck_shoulder_mobility-human.jpg', video: '/media/shared-scene/finetune25k_neck_shoulder_mobility-human.mp4' },
        { label: 'IK Reference', poster: '/media/root-locked/finetune25k_neck_shoulder_mobility.jpg', video: '/media/root-locked/finetune25k_neck_shoulder_mobility.mp4' }
      ]
    },

    // --- Biomechanics, Representation & Additional Studies (6 Local 1080p Clips) ---
    {
      id: 'additional_fatigue_running',
      featured: true,
      category: 'additional',
      badge: 'Biomechanics · 3CC-r Fatigue',
      title: 'Running with Muscle Fatigue · Early / Middle / Late',
      desc: 'Coupling three-compartment muscle fatigue across 284 volumetric muscles naturally induces progressive stride shortening (1.62 m → 1.10 m → 0.78 m) over 90 s.',
      type: 'single',
      poster: './media/additional/fatigue_running.jpg',
      video: './media/additional/fatigue_running.mp4'
    },
    {
      id: 'additional_shared_fascia',
      featured: true,
      category: 'additional',
      badge: 'Biomechanics · Compartmental Contact',
      title: 'Shared Calf Fascial Sleeve vs. Independent Muscles',
      desc: 'Packing gastrocnemius and soleus inside a shared tension-only fascial sleeve with unilateral sliding contact prevents inter-belly overlap and bounds outward bulging.',
      type: 'single',
      poster: './media/additional/shared_fascia.jpg',
      video: './media/additional/shared_fascia.mp4',
      variants: [
        { label: 'Labeled Comparison', poster: './media/additional/shared_fascia.jpg', video: './media/additional/shared_fascia.mp4' },
        { label: '21:9 Close-Up', poster: './media/additional/shared_fascia_wide.jpg', video: './media/additional/shared_fascia_wide.mp4' }
      ]
    },
    {
      id: 'additional_muscle_inertia',
      featured: true,
      category: 'additional',
      badge: 'Biomechanics · Tissue Dynamics',
      title: 'Muscle Mass & Soft-Tissue Inertia (0.25× Slow-Mo)',
      desc: 'Comparing quasi-static PD against inertial tissue prototypes during rapid elbow flexion, showing soft-tissue oscillation and compliant 0.075 kN/m attachment damping.',
      type: 'single',
      poster: './media/additional/muscle_inertia_closeup.jpg',
      video: './media/additional/muscle_inertia_closeup.mp4',
      variants: [
        { label: 'Full Arm + Close-Up', poster: './media/additional/muscle_inertia_closeup.jpg', video: './media/additional/muscle_inertia_closeup.mp4' },
        { label: 'Slide Overview', poster: './media/additional/muscle_inertia.jpg', video: './media/additional/muscle_inertia.mp4' }
      ]
    },
    {
      id: 'additional_deform_feedback',
      featured: false,
      category: 'additional',
      badge: 'Ablation · Two-Way Coupling',
      title: 'Deformation-Dependent Force Feedback',
      desc: 'Replaying identical activations under nominal VolMusCo, doubled tissue stiffness (2× E), and a frozen nominal MLP force map that diverges without volumetric feedback.',
      type: 'single',
      poster: './media/additional/deform_feedback.jpg',
      video: './media/additional/deform_feedback.mp4',
      variants: [
        { label: 'Full-Body Coupling', poster: './media/additional/deform_feedback.jpg', video: './media/additional/deform_feedback.mp4' },
        { label: 'Elbow 2× Stiffness', poster: './media/additional/youngs_elbow.jpg', video: './media/additional/youngs_elbow.mp4' }
      ]
    },
    {
      id: 'additional_actuation_comparison',
      featured: false,
      category: 'additional',
      badge: 'Ablation · Volumetric vs. 1D Hill',
      title: 'Actuation Comparison · Reference vs. Hill vs. Ours',
      desc: 'Side-by-side full-body comparison between 1D Hill-type line actuators and our two-way coupled 3D volumetric muscles.',
      type: 'single',
      poster: './media/additional/actuation_comparison.jpg',
      video: './media/additional/actuation_comparison.mp4'
    },
    {
      id: 'additional_mesh_resolution',
      featured: false,
      category: 'additional',
      badge: 'Ablation · Discretization',
      title: 'Volumetric Mesh Resolution · 9-Tet vs. 230-Tet vs. 290-Tet',
      desc: 'Comparing our runtime 9-tet muscle against 230-tet fitted/subdivided and 290-tet tube meshes under matched activation sequences (1.87° RMSE at >16,000× speedup).',
      type: 'single',
      poster: './media/additional/mesh_resolution.jpg',
      video: './media/additional/mesh_resolution.mp4'
    },

    // --- RL Baseline Ablations (3 Wide 5-Way Cards) ---
    {
      id: 'ablation-walk2_subject3_f01750',
      featured: false,
      wide: true,
      category: 'ablation',
      badge: '5-Way RL Comparison · Locomotion',
      title: 'Learning Baseline Comparison · Walking (LaFAN1)',
      desc: 'Side-by-side rollout under matched physical transition budgets: Reference, PPO, VolMusCo (Ours), MS-Emulator, and PPO-WM.',
      type: 'single',
      poster: '/media/nov21-muscle/walk2_subject3_f01750.jpg',
      video: '/media/nov21-muscle/walk2_subject3_f01750.mp4'
    },
    {
      id: 'ablation-run2_subject4_f07500',
      featured: false,
      wide: true,
      category: 'ablation',
      badge: '5-Way RL Comparison · High-Speed Gait',
      title: 'Learning Baseline Comparison · Running (LaFAN1)',
      desc: 'Comparison across Reference, PPO, VolMusCo (Ours), MS-Emulator, and PPO-WM on dynamic running.',
      type: 'single',
      poster: '/media/nov21-muscle/run2_subject4_f07500.jpg',
      video: '/media/nov21-muscle/run2_subject4_f07500.mp4'
    },
    {
      id: 'ablation-jumps1_subject1_f02515',
      featured: false,
      wide: true,
      category: 'ablation',
      badge: '5-Way RL Comparison · Flight Phase',
      title: 'Learning Baseline Comparison · Continuous Jumping (LaFAN1)',
      desc: 'Takeoff and landing stabilization compared across Reference, PPO, VolMusCo (Ours), MS-Emulator, and PPO-WM.',
      type: 'single',
      poster: '/media/nov21-muscle/jumps1_subject1_f02515.jpg',
      video: '/media/nov21-muscle/jumps1_subject1_f02515.mp4'
    }
  ]
};
