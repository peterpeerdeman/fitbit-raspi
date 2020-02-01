// Add types used throughout your project here.

declare namespace Raspi {
    interface LightCard {
        title: string,
        subtitle: string,
        _id: number
    }

    interface State {
        page: string,
        lights: {
            groupsData: Array<LightCard>
        }
    }
}
