import os
import json

def process_content(content, parent_type=None):
    html_content = ""
    for item in content:
        item_type = item.get("type")
        item_content = item.get("content")

        # Determine class for nested elements
        class_name = ""
        if parent_type == "row":
            class_name = "subRow"
        elif parent_type == "column":
            class_name = "subColumn"
        elif parent_type == "ul":
            class_name = "subUl"

        # Process based on type
        if item_type == "h2":
            html_content += f'<h2 class="{class_name}">{item_content}</h2>\n'
        elif item_type == "p":
            html_content += f'<p class="{class_name}">{item_content}</p>\n'
        elif item_type == "img":
            html_content += f'<span class="imageWithCaption {class_name}"><img src="{item.get("src")}"> ~ {item.get("caption")}</span>\n'
        elif item_type == "row":
            html_content += f'<div class="row {class_name}">\n'
            html_content += process_content(item_content, "row")
            html_content += '</div>\n'
        elif item_type == "column":
            html_content += f'<div class="column {class_name}">\n'
            html_content += process_content(item_content, "column")
            html_content += '</div>\n'
        elif item_type == "ul":
            html_content += f'<ul class="{class_name}">\n'
            for li_item in item_content:
                html_content += f'<li>{process_content([li_item], "ul")}</li>\n'
            html_content += '</ul>\n'
        elif item_type == "font":
            html_content += f'<span class="font {class_name}">{item_content}</span>\n'
        else:
            # Default: Use tag same as type
            html_content += f'<{item_type} class="{class_name}">{item_content}</{item_type}>\n'

    return html_content

def generate_html_for_news(news_id):
    news_file = f'noticias/{news_id}.json'

    if not os.path.exists(news_file):
        print(f"File {news_file} not found.")
        return

    with open(news_file, 'r', encoding='utf-8') as f:
        news_data = json.load(f)

    # Begin HTML structure
    html_content = '''<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../styles/header.css">
    <link rel="stylesheet" href="../styles/footer.css">
    <link rel="stylesheet" href="../styles/base.css">
    <link rel="stylesheet" href="../styles/noticia.css"> 
    <title>Fuente Conservadora - Noticia</title> 

</head>

<body>

    <header>

        <div>
            <img src="../images/logo.png"><h1>FUENTE CONSERVADORA</h1>
        </div>

        <nav>
            <ul>
                <li id="noticias-button">Noticias</li>
                <li><a href="dolar.html">Dolar</a></li>
                <li><a href="#redes-nav">Redes</a></li>
            </ul>
        </nav>

        <nav id="topics-nav">
            <ul id="topics-list">
            </ul>
        </nav>

    </header>

    <main>

        <section id="noticia">
    '''

    # Add processed news content to main section
    html_content += process_content(news_data)

    # Close main section and body
    html_content += '''
        </section>

    </main>

    <footer>
        <nav id="redes-nav">
            <ul>
                <li><a href="https://www.instagram.com/fuenteconservadora/" target="_blank"><div class="logo-border"><img src="https://1000marcas.net/wp-content/uploads/2019/11/insta-logo.png"></div></a></li>
                <li><a href="https://x.com/F_Conservadora" target="_blank"><div class="logo-border"><img src="https://1000marcas.net/wp-content/uploads/2019/11/Twitter-Logo.png"></div></a></li>
                <li><a href="mailto:fuenteconservadora@gmail.com" target="_blank"><div id="mail-logo" class="logo-border"><img src="https://icons.veryicon.com/png/o/business/oa-office/mail-227.png"></div></a></li>
            </ul>
        </nav>
    </footer>

    <script src="index.js"></script>

</body>

</html>
    '''

    # Write HTML content to file
    output_file = f'noticias/{news_id}.html'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html_content)

    print(f"Generated HTML for {news_id} at {output_file}")

def main():
    # Load the main JSON file with the list of news IDs
    with open('noticias/noticias.json', 'r', encoding='utf-8') as f:
        news_list = json.load(f)

    # Process each news ID
    for news_item in news_list:
        news_id = news_item['id']
        generate_html_for_news(news_id)

if __name__ == "__main__":
    main()
