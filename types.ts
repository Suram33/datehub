
export enum ActivityType { DINING = 'Dining', MOVIE = 'Movie', OUTDOOR = 'Outdoor', COFFEE = 'Coffee', CONCERT = 'Concert', GAMING = 'Gaming', OTHER = 'Other' }
export enum PaymentPreference { I_PAY = 'I will pay', YOU_PAY = 'You pay' }
export interface Review { id: string; reviewerName: string; reviewerPhoto: string; rating: number; comment: string; timestamp: string; }
export interface DateMemory { id: string; photoUrl: string; activityTitle: string; date: string; }
export interface User { id: string; name: string; age: number; bio: string; photos: string[]; location: string; lat?: number; lng?: number; rating: number; reviewCount: number; reviews?: Review[]; memories?: DateMemory[]; }
export interface Message { id: string; senderId: string; text: string; timestamp: Date; }
export interface Chat { id: string; proposalId: string; participants: User[]; messages: Message[]; lastMessage: string; }
export interface DateProposal { id: string; hostId: string; activityType: ActivityType; title: string; description: string; price: number; paymentPreference: PaymentPreference; date: string; time: string; location: string; lat: number; lng: number; host?: User; videoUrl?: string; }
export interface AppNotification { id: string; type: 'reminder' | 'message' | 'status'; title: string; message: string; timestamp: string; isRead: boolean; }
