"""
Based on https://github.com/Taiwanese-Corpus/Pakhelke-1916_Taiwanese-Bible/blob/master/txt2json.py
"""

import json
from os.path import join
import re


def main():
    bible = read('pkl-poj.txt')
    for book, content in sorted(bible.items(), key=lambda x: x[1]['bookno']): 
        with open(book + '.json', 'w') as file:
            json.dump(
                content, file,
                ensure_ascii=False, sort_keys=True, indent=2
            )


def read(filename):
    parse = re.compile('(.+) (\d+) (\d+)\|(.*)\Z')
    books = set()
    bible = {}
    with open(filename) as file:
        for line in file.readlines():
            result = parse.match(line.strip())
            book = result.group(1)
            chapter = int(result.group(2))
            verse = int(result.group(3))
            text = result.group(4)
            books.add(book)
            bookno = len(books)
            
            if book not in bible:
                bible[book] = {}
            if chapter not in bible[book]:
                bible[book][chapter] = {}
            bible[book][chapter][verse] = {'text': text}
            bible[book][chapter][verse]['mp3'] = join(
                '{}'.format(bookno),
                '{}_{:03}_{:02}.mp3'.format(bookno, chapter, verse)
            )
            
            bible[book]['bookno'] = bookno
    
    return bible


if __name__ == '__main__':
    main()