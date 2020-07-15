// Add types used throughout your project here.

declare namespace Raspi {
    interface LightCard {
        title: string,
        subtitle: string,
        _id: number
    }

    interface ZoneCard {
        title: string,
        subtitle: string,
        zoneId: number
    }

    interface DefaultCard {
        title: string,
        subtitle: string
    }

    interface State {
        page: string,
        lights: {
            groupsData: Array<LightCard>
        },
        thermostat: {
            zonesData: Array<ZoneCard>
        },
        solar: {
            outputs: Array<DefaultCard>
        },
        car: {
            charge: DefaultCard
        },
        cluster: {
            portTable: Array<DefaultCard>
        }
    }
}
