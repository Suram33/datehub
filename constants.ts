
import { ActivityType, PaymentPreference, User, DateProposal } from './types';

export const MOCK_USERS: User[] = [
  {
    id: 'u1', name: 'Ananya S.', age: 25, bio: 'Architect & Traveler.', photos: ['https://picsum.photos/seed/a1/400/500'],
    location: 'Mumbai', rating: 4.8, reviewCount: 12, memories: [{ id: 'm1', photoUrl: 'https://picsum.photos/seed/m1/400/400', activityTitle: 'Italian Dinner', date: 'Sep 12' }]
  }
];

export const INITIAL_PROPOSALS: DateProposal[] = [
  {
    id: 'p1', hostId: 'u1', activityType: ActivityType.DINING, title: 'Rooftop Dinner',
    description: 'Beautiful views and great pasta.', price: 2500, paymentPreference: PaymentPreference.I_PAY,
    date: '2024-12-01', time: '20:00', location: 'Bandra, Mumbai', lat: 19.07, lng: 72.87, host: MOCK_USERS[0],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  }
];
