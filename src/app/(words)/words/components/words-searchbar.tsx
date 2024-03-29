'use client';

import styles from './words-searchbar.module.css';
import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { KeyboardEvent, useEffect, useRef, useState, Suspense } from 'react';

export default function WordsSearchbar() {
    const searchParams = useSearchParams();
    let query: string = searchParams.get('q') || '';
    const [enteredText, setEnteredText] = useState(query);

    const inputRef = useRef<HTMLInputElement>(null);

    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();

            if (enteredText.length > 0) {
                inputRef.current.setSelectionRange(enteredText.length, enteredText.length);
            }
        }
    });

    const updateSearchParams = useDebouncedCallback((query: string) => {
        const params = new URLSearchParams(searchParams);

        if (query) {
            params.set('q', query);
        } else {
            params.delete('q');
        }

        router.replace(`${pathname}?${params.toString()}`);
    }, 150);

    function handleSearchbarKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.code == 'Escape') {
            updateSearchParams('');
            setEnteredText('');
        }

        if (event.code == 'Enter' && enteredText) {
            router.push(`/words/create?${searchParams.toString()}`);
        }
    }

    return (
        <Suspense>
            <div className={styles.searchbar}>
                <input
                    ref={inputRef}
                    placeholder='Поиск...'
                    value={enteredText}
                    onInput={event => {
                        let target = event.target as HTMLInputElement;
                        updateSearchParams(target.value);
                        setEnteredText(target.value);
                    }}
                    onKeyDown={event => handleSearchbarKeyDown(event)}
                />
                {/* TODO   Change color of autofocused input with styles*/}
            </div>
        </Suspense>
    );
}