import type { AdoptablePet } from '@/types'

/**
 * Mock adoptable pets from shelters across Armenia.
 * In a real app this would come from an API like Petfinder.
 */

const petImage = (seed: string) => `https://placedog.net/400/300?id=${seed}`

const catImage = (seed: string) =>
	`https://placekitten.com/400/300?image=${seed}`

export const adoptablePets: AdoptablePet[] = [
	// === DOGS ===
	{
		id: 'dog-1',
		name: 'Bidzo',
		species: 'dog',
		breed: 'Gampr',
		age: '3 years',
		size: 'large',
		gender: 'male',
		photo: petImage('1'),
		bio: 'Bidzo is a proud Armenian Gampr — a gentle giant bred to guard flocks in the highlands. He loves long mountain walks and thinks he is a lap dog. Great with older kids and endlessly loyal.',
		goodWithKids: true,
		goodWithPets: false,
		shelter: 'Yerevan Animal Shelter',
		location: 'Yerevan'
	},
	{
		id: 'dog-2',
		name: 'Nairi',
		species: 'dog',
		breed: 'Gampr Mix',
		age: '2 years',
		size: 'medium',
		gender: 'female',
		photo: petImage('2'),
		bio: 'Nairi is an energetic sweetheart who loves to play fetch in the park and cuddle on the couch. She is house-trained, knows basic commands, and gives the best kisses!',
		goodWithKids: true,
		goodWithPets: true,
		shelter: 'Dilijan Paws Rescue',
		location: 'Dilijan'
	},
	{
		id: 'dog-3',
		name: 'Vazgen',
		species: 'dog',
		breed: 'Caucasian Shepherd',
		age: '4 years',
		size: 'large',
		gender: 'male',
		photo: petImage('3'),
		bio: 'Vazgen is a certified therapy dog who brings joy everywhere he goes. He is calm, well-trained, and perfect for a family looking for a mature, loving companion.',
		goodWithKids: true,
		goodWithPets: true,
		shelter: 'Ararat Rescue',
		location: 'Artashat'
	},
	{
		id: 'dog-4',
		name: 'Tsolak',
		species: 'dog',
		breed: 'Labrador Retriever',
		age: '1 year',
		size: 'large',
		gender: 'male',
		photo: petImage('4'),
		bio: 'Tsolak is a playful young Lab who loves swimming in Lake Sevan, fetching, and making new friends. He has endless energy and would love an active family!',
		goodWithKids: true,
		goodWithPets: true,
		shelter: 'Sevan Lake Animal Shelter',
		location: 'Sevan'
	},
	{
		id: 'dog-5',
		name: 'Aram',
		species: 'dog',
		breed: 'German Shepherd',
		age: '5 years',
		size: 'large',
		gender: 'male',
		photo: petImage('5'),
		bio: 'Aram is intelligent and loyal. He knows over 20 commands and is looking for someone who appreciates a well-trained companion. Great guard-dog instincts.',
		goodWithKids: true,
		goodWithPets: false,
		shelter: 'Gyumri Shepherd Rescue',
		location: 'Gyumri'
	},
	{
		id: 'dog-6',
		name: 'Manushak',
		species: 'dog',
		breed: 'Beagle',
		age: '6 years',
		size: 'medium',
		gender: 'female',
		photo: petImage('6'),
		bio: 'Manushak is a sweet senior girl who still has plenty of pep! She loves sniffing around the yard and curling up by your feet. Low maintenance and full of love.',
		goodWithKids: true,
		goodWithPets: true,
		shelter: 'Vanadzor Animal Care',
		location: 'Vanadzor'
	},
	{
		id: 'dog-7',
		name: 'Areg',
		species: 'dog',
		breed: 'Golden Retriever',
		age: '2 years',
		size: 'large',
		gender: 'male',
		photo: petImage('7'),
		bio: 'Areg is the definition of a good boy. Friendly with everyone he meets, loves kids, and dreams of a family with a big yard in the countryside to explore.',
		goodWithKids: true,
		goodWithPets: true,
		shelter: 'Ijevan Forest Rescue',
		location: 'Ijevan'
	},
	{
		id: 'dog-8',
		name: 'Loosik',
		species: 'dog',
		breed: 'French Bulldog',
		age: '3 years',
		size: 'small',
		gender: 'female',
		photo: petImage('8'),
		bio: 'Loosik is a charming little lady who loves attention. She is great for apartment living in the city, does not need much exercise, and has the cutest snore!',
		goodWithKids: true,
		goodWithPets: true,
		shelter: 'Kentron City Rescue',
		location: 'Yerevan'
	},
	{
		id: 'dog-9',
		name: 'Zoravar',
		species: 'dog',
		breed: 'Gampr',
		age: '1 year',
		size: 'large',
		gender: 'male',
		photo: petImage('9'),
		bio: 'Zoravar is a young pup with tons of potential! He is eager to learn, loves training sessions with treats, and bonds deeply with his people. Looking for his forever home.',
		goodWithKids: true,
		goodWithPets: false,
		shelter: 'Kapan Mountain Rescue',
		location: 'Kapan'
	},
	{
		id: 'dog-10',
		name: 'Chalik',
		species: 'dog',
		breed: 'Chihuahua Mix',
		age: '4 years',
		size: 'small',
		gender: 'female',
		photo: petImage('10'),
		bio: 'Chalik may be small but she has a big personality! She is sassy, loves to burrow under blankets, and will be your devoted shadow.',
		goodWithKids: false,
		goodWithPets: true,
		shelter: 'Ashtarak Tiny Paws',
		location: 'Ashtarak'
	},
	{
		id: 'dog-11',
		name: 'Arjuk',
		species: 'dog',
		breed: 'Husky',
		age: '2 years',
		size: 'large',
		gender: 'male',
		photo: petImage('11'),
		bio: 'Arjuk is a gorgeous Husky who loves to run through the snow of the highlands and howl! He needs an experienced owner who understands the breed. Escape artist extraordinaire.',
		goodWithKids: true,
		goodWithPets: true,
		shelter: 'Lori Highland Husky Rescue',
		location: 'Vanadzor'
	},
	{
		id: 'dog-12',
		name: 'Shoghik',
		species: 'dog',
		breed: 'Boxer',
		age: '5 years',
		size: 'large',
		gender: 'female',
		photo: petImage('12'),
		bio: 'Shoghik is a goofy, lovable Boxer who will make you laugh every day. She is great with kids and loves being part of family activities.',
		goodWithKids: true,
		goodWithPets: true,
		shelter: 'Hrazdan Valley Rescue',
		location: 'Hrazdan'
	},

	// === CATS ===
	{
		id: 'cat-1',
		name: 'Mirouk',
		species: 'cat',
		breed: 'Domestic Shorthair',
		age: '2 years',
		size: 'medium',
		gender: 'male',
		photo: catImage('1'),
		bio: 'Mirouk is a curious explorer who loves watching birds from the window over the old city. He is independent but enjoys evening cuddle sessions.',
		goodWithKids: true,
		goodWithPets: true,
		shelter: 'Feline Friends Yerevan',
		location: 'Yerevan'
	},
	{
		id: 'cat-2',
		name: 'Nazeli',
		species: 'cat',
		breed: 'Ragdoll',
		age: '3 years',
		size: 'large',
		gender: 'female',
		photo: catImage('2'),
		bio: 'Nazeli is a fluffy sweetheart who goes limp when you pick her up (true to her breed!). She loves being held and will follow you room to room.',
		goodWithKids: true,
		goodWithPets: true,
		shelter: 'Gyumri Cat Haven',
		location: 'Gyumri'
	},
	{
		id: 'cat-3',
		name: 'Storun',
		species: 'cat',
		breed: 'Black Domestic Shorthair',
		age: '1 year',
		size: 'medium',
		gender: 'male',
		photo: catImage('3'),
		bio: 'Storun is a sleek, playful cat who loves chasing laser pointers and toy mice. He is bonded with his sister Nairi and they would love to be adopted together!',
		goodWithKids: true,
		goodWithPets: true,
		shelter: 'Dilijan Cat Rescue',
		location: 'Dilijan'
	},
	{
		id: 'cat-4',
		name: 'Takouhi',
		species: 'cat',
		breed: 'Persian',
		age: '6 years',
		size: 'medium',
		gender: 'female',
		photo: catImage('4'),
		bio: 'Takouhi lives up to her name (it means "queen") — she expects the royal treatment! A quiet home with gentle handling would be perfect for this elegant lady.',
		goodWithKids: false,
		goodWithPets: false,
		shelter: 'Fancy Felines Yerevan',
		location: 'Yerevan'
	},
	{
		id: 'cat-5',
		name: 'Kcitten',
		species: 'cat',
		breed: 'Orange Tabby',
		age: '4 years',
		size: 'large',
		gender: 'male',
		photo: catImage('5'),
		bio: 'Kcitten is a big orange boy with an even bigger appetite for love (and treats). He is laid-back, friendly, and gets along with everyone.',
		goodWithKids: true,
		goodWithPets: true,
		shelter: 'Vanadzor Tabby Town',
		location: 'Vanadzor'
	},
	{
		id: 'cat-6',
		name: 'Sona',
		species: 'cat',
		breed: 'Siamese Mix',
		age: '2 years',
		size: 'medium',
		gender: 'female',
		photo: catImage('6'),
		bio: 'Sona is vocal and will chat with you all day! She is intelligent, loves puzzle feeders, and needs mental stimulation to stay happy.',
		goodWithKids: true,
		goodWithPets: true,
		shelter: 'Ararat Siamese Rescue',
		location: 'Artashat'
	},

	// === BIRDS ===
	{
		id: 'bird-1',
		name: 'Arev',
		species: 'bird',
		breed: 'Cockatiel',
		age: '3 years',
		size: 'small',
		gender: 'male',
		photo:
			'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=300&fit=crop',
		bio: 'Arev (meaning "sun") loves to whistle tunes and will learn your favorite songs! He is hand-tamed and enjoys sitting on shoulders while you work.',
		goodWithKids: true,
		goodWithPets: false,
		shelter: 'Feathered Friends Yerevan',
		location: 'Yerevan'
	},
	{
		id: 'bird-2',
		name: 'Tsiran',
		species: 'bird',
		breed: 'Parakeet',
		age: '1 year',
		size: 'small',
		gender: 'female',
		photo:
			'https://images.unsplash.com/photo-1544923246-77307dd628b4?w=400&h=300&fit=crop',
		bio: 'Tsiran (named after the apricot, Armenia\u2019s beloved fruit) is a bright bundle of energy! She loves mirrors, bells, and chattering. Perfect for someone new to bird ownership.',
		goodWithKids: true,
		goodWithPets: false,
		shelter: 'Wings of Hope Gyumri',
		location: 'Gyumri'
	},

	// === OTHER (Small animals) ===
	{
		id: 'other-1',
		name: 'Poqrik',
		species: 'other',
		breed: 'Holland Lop Rabbit',
		age: '2 years',
		size: 'small',
		gender: 'male',
		photo:
			'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=300&fit=crop',
		bio: 'Poqrik (meaning "little one") is an adorable lop-eared bunny who loves hay, fresh veggies, and gentle pets. He is litter-trained and loves to binky around!',
		goodWithKids: true,
		goodWithPets: false,
		shelter: 'Ashtarak Small Wonders',
		location: 'Ashtarak'
	},
	{
		id: 'other-2',
		name: 'Nuka',
		species: 'other',
		breed: 'Guinea Pig',
		age: '1 year',
		size: 'small',
		gender: 'female',
		photo:
			'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&h=300&fit=crop',
		bio: 'Nuka wheeks with excitement at veggie time! She is social and would love a guinea pig companion or a family who gives her lots of attention.',
		goodWithKids: true,
		goodWithPets: true,
		shelter: 'Abovyan Small Pets Rescue',
		location: 'Abovyan'
	},
	{
		id: 'other-3',
		name: 'Voskan',
		species: 'other',
		breed: 'Hedgehog',
		age: '1 year',
		size: 'small',
		gender: 'male',
		photo:
			'https://images.unsplash.com/photo-1497752531616-c3afd9760a11?w=400&h=300&fit=crop',
		bio: 'Voskan is a curious little hedgehog who loves to explore at night. He needs a quiet home and patient owner to help him come out of his shell!',
		goodWithKids: false,
		goodWithPets: false,
		shelter: 'Goris Exotic Pet Rescue',
		location: 'Goris'
	},
	{
		id: 'dog-13',
		name: 'Tsaghik',
		species: 'dog',
		breed: 'Gampr Mix',
		age: '2 years',
		size: 'medium',
		gender: 'female',
		photo: petImage('13'),
		bio: 'Tsaghik (meaning "flower") is a gorgeous girl with impeccable manners. She is gentle, loves car rides through the mountains, and will be your best adventure buddy.',
		goodWithKids: true,
		goodWithPets: true,
		shelter: 'Echmiadzin Rescue',
		location: 'Echmiadzin'
	}
]

export function getAdoptablePetById(id: string): AdoptablePet | undefined {
	return adoptablePets.find(pet => pet.id === id)
}

export function getAdoptablePetsByIds(ids: string[]): AdoptablePet[] {
	return ids
		.map(id => adoptablePets.find(pet => pet.id === id))
		.filter((pet): pet is AdoptablePet => pet !== undefined)
}
