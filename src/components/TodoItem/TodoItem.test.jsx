import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import TodoItem from './TodoItem';
import mockData from '../../../mockData';

describe('TodoItem Tests', () => {
    it('Should render todoItem property', ()=>{
        render(<TodoItem todo={mockData[0]}/>);
        expect(screen.queryByTest(/eat breakfast/i)).toBeInTheDocument();
        expect(screen.getByTextId('close-btn-1')).toBeInTheDocument();
    })
})