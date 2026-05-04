import Event from "./Event";

export const getNearbyEvents = async (lng: number, lat: number) => {
	return Event.find({
		location: {
			$near: {
				$geometry: { type: "Point", coordinates: [lng, lat] },
				$maxDistance: 50000, // 50km
			},
		},
	});
};
