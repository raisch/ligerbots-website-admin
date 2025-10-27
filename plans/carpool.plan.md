# Carpool Plan

## Objectives

- Organize carpools for events using Directus as backend
- Provide simple carpool coordination without complex user management
- Leverage Directus GraphQL API for all data operations

## Features

- Carpool creation and management via Directus GraphQL
- Event-based ride coordination
- Simple contact information sharing

## Directus Collections

- event - Represents an event that requires carpools (e.g., a competition or meeting)
- event_trips - Associates trips with a specific event
- destination_trip - Represents a trip to an event destination
- destination_trip_rides - Represents a ride associated with a destination trip
- return_trip - Represents a trip returning from an event
- return_trip_rides - Represents a ride associated with a return trip
- ride - Represents an individual ride, including driver, vehicle, and passenger details
- ride_driver - Contains driver information for a ride
- trip_ride - Associates a ride with a trip (either destination or return)
- trip_ride_riders - Represents a passenger/rider for a specific trip ride

GraphQL will be used to interact with these collections for creating, reading, updating, and deleting carpool data.

## GraphQL Operations

### Queries

- Fetch events and their details
- Fetch event trips, including event info
- Fetch destination trips, including rides and ride details
- Fetch destination trip rides, including ride details

### Mutations

- Create new event, event trip, destination trip, or destination trip ride entries
- Update existing event, event trip, destination trip, or destination trip ride information
- Delete entries as needed

## Milestones

### Milestone 1: Directus Integration and Data Models

- [ ] Set up Directus GraphQL endpoint configuration
- [ ] Create carpool data models in Directus
- [ ] Implement GraphQL client for data access
- [ ] Set up basic authentication with Directus

### Milestone 2: Carpool Creation and Management

- [ ] Implement carpool creation form using Directus GraphQL mutations
- [ ] Add carpool listing page with GraphQL queries
- [ ] Enable carpool editing and deletion through GraphQL
- [ ] Implement real-time updates via GraphQL subscriptions

### Milestone 3: Event Integration and Coordination

- [ ] Connect carpools to Directus event system
- [ ] Add event-specific carpool filtering
- [ ] Implement basic contact sharing (no profiles needed)

### Milestone 4: Enhanced Features

- [ ] Add carpool capacity management
- [ ] Implement basic ride status tracking
- [ ] Create simple notification system integration

## Timeline

- Week 1-2: Directus Integration and Data Models
- Week 3-4: Carpool Creation and Management
- Week 5-6: Event Integration and Coordination
- Week 7-8: Enhanced Features and Testing

## Resources

- Development Team: 2 developers, 1 designer
- Tools: Svelte/Express, Directus GraphQL API, Apollo Client/GraphQL-Request

## Risks and Mitigations

- Risk: Directus API rate limiting
  - Mitigation: Implement proper caching and request optimization
- Risk: GraphQL query complexity
  - Mitigation: Use query depth limiting and implement efficient queries
- Risk: Data synchronization issues
  - Mitigation: Implement proper error handling and retry mechanisms
- Risk: Limited authentication without user management
  - Mitigation: Use simple token-based access or public read access with moderated writes

## Evaluation

- Directus API performance monitoring
- GraphQL query optimization analysis
- Usage analytics through Directus insights
- Regular code reviews and architecture assessments

## Technical Architecture

### Data Models in Directus

- **event**: id, status, start_date, end_date, name, location, publish_on, auto_publish, description
- **event_trips**: id, event_id, destination_trip, return_trip
- **destination_trip**: id, status, destination, departs_from, departs_on, departs_at, rides, arrives_at
- **destination_trip_rides**: id, destination_trip_id, ride
- **return_trip**: id, status, destination, departs_from, departs_on, departs_at, rides, arrives_at
- **return_trip_rides**: id, return_trip_id, ride
- **ride**: id, driver, vehicle, passengers
- **ride_driver**: id, ride_id, driver_name, driver_contact
- **trip_ride**: id, ride_id, trip_id
- **trip_ride_riders**: id, trip_ride_id, passenger_name, passenger_contact

### GraphQL Integration

- Use Apollo Client or graphql-request for API calls
- Implement query caching for better performance
- Use GraphQL subscriptions for real-time updates
- Leverage Directus auto-generated GraphQL schema

## Future Enhancements

- Mobile-responsive design optimization
- Integration with calendar systems
- SMS/email notifications via Directus flows
- Export carpool data for event organizers
