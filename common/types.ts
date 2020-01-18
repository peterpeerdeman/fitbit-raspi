// Add types used throughout your project here.

declare namespace Raspi {
    interface LightCard {
        title: string,
        subtitle: string,
        groupId: number
    }

    interface State {
        page: string,
        lights: {
            groupsData: Array<LightCard>
        }
    }
}
