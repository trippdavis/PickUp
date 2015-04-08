User.create(username: "username1", password: "password1")
User.create(username: "username2", password: "password2")
User.create(username: "username3", password: "password3")

Group.create(organizer_id: 1, title: "Group 1", description: "First Group")
Group.create(organizer_id: 1, title: "Group 2", description: "Second Group")
Group.create(organizer_id: 1, title: "Group 3", description: "Third Group")
Group.create(organizer_id: 2, title: "Group 4", description: "Fourth Group")

Event.create(group_id: 1, title: "Event 1", description: "First Event", time: (Time.now + 500000), location: "First Event Locations")
Event.create(group_id: 1, title: "Event 2", description: "Second Event", time: (Time.now + 1000000), location: "Second Event Locations")
Event.create(group_id: 2, title: "Event 3", description: "Third Event", time: (Time.now + 1500000), location: "Third Event Locations")
Event.create(group_id: 3, title: "Event 4", description: "Fourth Event", time: (Time.now + 2000000), location: "Fourth Event Locations")
Event.create(group_id: 4, title: "Event 5", description: "Ffth Event", time: (Time.now + 2500000), location: "FifthEvent Locations")
Event.create(group_id: 4, title: "Event 6", description: "Sixth Event", time: (Time.now + 3000000), location: "Sixth Event Locations")
