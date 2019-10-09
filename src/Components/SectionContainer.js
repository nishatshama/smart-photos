import React, { useState, useEffect, useContext } from 'react';

import { AppContext } from '../reducer/reducer';

export default function ShowPhotos() {
    const { AppDataReducer } = React.useContext(AppContext);

    return (
        <span></span>
    )
}