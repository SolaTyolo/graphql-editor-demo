import { GraphQLEditor } from 'graphql-editor';
import { PassedSchema } from 'graphql-editor/lib/Models';
import { MainTheme } from 'graphql-editor/lib/gshared/theme/MainTheme';
import { Export } from './Export'

import React, {
  useEffect,
  useState,
} from 'react';

export const App = () => {
  let defaultGqlEditorSchema: PassedSchema = {
    code: '',
    libraries: '',
  };

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

  return (
    <div
      style={{
        flex: 1,
        width: '100vw',
        height: '100vh',
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
      <Export />
    </div>
  );
};

export default App;