export default defineEventHandler(() => {
  const articles = {
    articles: [
      {
        id: '1',
        slug: 'future-of-air-traffic-control',
        title: 'The Future of Air Traffic Control',
        summary: 'How modern technology is reshaping the way controllers manage thousands of flights daily.',
        content: `Air traffic control has evolved dramatically over the past few decades. From radar screens and paper strips to fully digital systems, the transformation has been remarkable. Today, controllers rely on advanced software to track hundreds of aircraft simultaneously, each with its own flight plan, altitude, and speed profile.\n\nModern ATC systems integrate real-time weather data, predictive conflict detection, and automated alerts to help controllers make faster and safer decisions. Technologies like ADS-B allow aircraft to broadcast their position with GPS precision, replacing older radar approaches.\n\nLooking ahead, the industry is investing in AI-assisted traffic flow management, remote tower operations, and seamless coordination across international airspace boundaries.`,
        author: 'María López',
        publishedAt: '2025-11-10',
        category: 'Technology',
      },
      {
        id: '2',
        slug: 'airline-sustainability-2025',
        title: 'Airline Sustainability Initiatives in 2025',
        summary: 'A look at how major carriers are tackling carbon emissions and pushing for greener skies.',
        content: `The aviation industry accounts for roughly 2–3% of global CO₂ emissions, and airlines worldwide are under increasing pressure to reduce their environmental footprint. In 2025, sustainability is no longer a talking point — it is a strategic pillar for every major carrier.\n\nSeveral airlines have committed to net-zero emissions by 2050, backed by concrete short-term targets. Key strategies include fleet renewal with fuel-efficient aircraft, adoption of Sustainable Aviation Fuel (SAF), and investment in carbon offset programs.\n\nSAF, produced from waste materials and non-food crops, can reduce lifecycle carbon emissions by up to 80% compared to conventional jet fuel. While still more expensive and limited in supply, production capacity is scaling rapidly thanks to government incentives and airline long-term purchase agreements.`,
        author: 'Carlos Ruiz',
        publishedAt: '2025-12-03',
        category: 'Sustainability',
      },
      {
        id: '3',
        slug: 'understanding-airline-alliances',
        title: 'Understanding Airline Alliances and Their Benefits',
        summary: 'Why Star Alliance, SkyTeam, and oneworld exist — and what they mean for passengers and carriers alike.',
        content: `Airline alliances are cooperative agreements between carriers that allow them to coordinate schedules, share lounges, and offer reciprocal frequent flyer benefits. The three major global alliances — Star Alliance, SkyTeam, and oneworld — collectively cover the vast majority of international routes.\n\nFor passengers, alliances mean smoother connections, the ability to earn and redeem miles across multiple airlines, and access to partner lounges during layovers.\n\nFor airlines, alliances reduce costs through joint purchasing, code-sharing agreements, and shared ground handling at key hubs. They also allow carriers to serve markets they could not reach profitably on their own.`,
        author: 'Ana Martínez',
        publishedAt: '2026-01-15',
        category: 'Business',
      },
    ],
  }
  return articles
})
