function renderSettings(props): JSX.Element {
  return (
    <Page>
      <Section title={<Text bold align="left">About</Text>}>
        <Text>Configure your settings here.</Text>
      </Section>
    </Page>
  );
}

registerSettingsPage(renderSettings);