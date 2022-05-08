import { GraphQLEditor } from 'graphql-editor';
import { PassedSchema } from 'graphql-editor/lib/Models';
import { MainTheme } from 'graphql-editor/lib/gshared/theme/MainTheme';

import React, {
  useEffect,
  useState,
} from 'react';

export const App = () => {
  let defaultGqlEditorSchema: PassedSchema = {
    code: '',
    libraries: '',
  };

  // load from github raw filepath
  try {
    const gqlEditorSchema: string | null = localStorage.getItem('gqlEditorSchema');

    if (gqlEditorSchema) {
      defaultGqlEditorSchema = JSON.parse(gqlEditorSchema);
      console.log('Schema loaded from local storage.');
    }
  } catch (e) {
    console.error(e);
  }

  const [gqlEditorSchema, setGqlEditorSchema] = useState<PassedSchema>(defaultGqlEditorSchema);

  useEffect(() => {
    localStorage.setItem('gqlEditorSchema', JSON.stringify(gqlEditorSchema));
    console.log('Schema saved to local storage.');
  }, [gqlEditorSchema]);

  console.log('gqlEditorSchema', gqlEditorSchema);

  return (
    <div
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignSelf: 'stretch',
        display: 'flex',
        position: 'relative',
      }}
    >
      <GraphQLEditor
        setSchema={setGqlEditorSchema}
        schema={gqlEditorSchema}
        theme={MainTheme}
      />

    </div>
  );
};

export default App;