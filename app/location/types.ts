// Global Location type for UI props
export type Location = {
    id: number;
	googlePlaceId: string;
    name: string;
	location: string;
	description: string;
	imageUrl: string;
	googleMapsUrl: string;
	hasDesk: boolean;
	hasSofa: boolean;
	canPurchaseFoodDrinks: boolean;
	allowsDrinks: boolean;
	allowsFood: boolean;
	noiseLevel: string;
	groupFriendly: boolean;
	soloFriendly: boolean;
	hasOutlets: boolean;
	// currentBusyness?: string | number; // Uncomment and adjust type if needed
};