import { createSlice } from '@reduxjs/toolkit';

const mediaTypes = {
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
};

const initialState = {
  value: mediaTypes.IMAGE,
};

export const mediaTypeSlice = createSlice({
  name: 'mediaType',
  initialState,
  reducers: {
    setMediaType: (state, action) => {
        const { mediaType } = action.payload;
        if (!Object.values(mediaTypes).includes(mediaType)) {
          throw new Error(`Invalid media type: ${mediaType}`);
        }
        // Create a copy of the state
        const newState = { ...state };
  
        // Update the value property
        newState.value = mediaType;
  
        // Return the updated state
        return newState;
      },
  },
});

export const { setMediaType } = mediaTypeSlice.actions;
export default mediaTypeSlice.reducer;
