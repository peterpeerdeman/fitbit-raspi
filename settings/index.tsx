function renderSettings(props): JSX.Element {
  return (
    <Page>
      <Section title={<Text bold align="left">RaspAPI Urls</Text>}>
        <TextInput
          label="API url"
          settingsKey="raspapi_url"
        />
      </Section>
      <Section title={<Text bold align="left">RaspAPI Credentials</Text>}>
        <TextInput
          label="authheader"
          settingsKey="raspapi_authheader"
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(renderSettings);
