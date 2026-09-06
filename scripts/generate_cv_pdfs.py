from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
PHOTO_PATH = ROOT / "src" / "assets" / "profile-photo.jpg"

PAGE_W, PAGE_H = A4
MARGIN = 42
BODY_TOP = 628
BODY_BOTTOM = 48
GUTTER = 25
SIDEBAR_X = MARGIN
SIDEBAR_W = 164
MAIN_X = SIDEBAR_X + SIDEBAR_W + GUTTER
MAIN_W = PAGE_W - MARGIN - MAIN_X

INK = HexColor("#202220")
MUTED = HexColor("#666963")
LIGHT = HexColor("#F1F2EE")
GRID = HexColor("#D9DCD4")
ACCENT = HexColor("#C0F203")
WHITE = HexColor("#FFFFFF")


DATA = {
    "EN": {
        "file": "Marian-Bodnar-CV-EN.pdf",
        "location": "Bratislava, Slovakia",
        "phone_label": "PHONE",
        "birth_label": "YEAR OF BIRTH",
        "role": "DATA SCIENCE / DATA ENGINEERING",
        "profile_label": "ABOUT ME",
        "profile": (
            "Data Scientist with a strong Data Engineering focus. I design and maintain Apache "
            "Spark and Delta Lake pipelines, analytical datasets and reporting solutions for GIS, "
            "metering and customer-data domains."
        ),
        "languages_label": "LANGUAGES",
        "languages": [("Slovak", "Native"), ("English", "B2")],
        "education_label": "EDUCATION",
        "education": [
            ("2025 - Present", "MSc. Applied Informatics for Industry 4.0", "Paneuropean University, Bratislava"),
            ("2021 - 2025", "BSc. Applied Informatics for Industry 4.0", "Paneuropean University, Bratislava"),
            ("2006 - 2010", "Electrical Engineering", "Technical Secondary School, Rimavska Sobota - Tisovec"),
        ],
        "certifications_label": "CERTIFICATIONS",
        "certifications": [
            ("DP-750", "Azure Databricks Data Engineer Associate", "Microsoft / 2026"),
            ("DP-700", "Fabric Data Engineer Associate", "Microsoft / 2025"),
            ("DP-600", "Fabric Analytics Engineer Associate", "Microsoft / 2025"),
            ("AI-900", "Azure AI Fundamentals", "Microsoft / 2025"),
            ("DP-900", "Azure Data Fundamentals", "Microsoft / 2024"),
        ],
        "skills_label": "SKILLS",
        "skills": [
            "Python / SQL",
            "Apache Spark / PySpark",
            "Delta Lake / Databricks",
            "Microsoft Fabric / CI/CD",
            "Power BI / Data modelling",
            "Git / GitHub / Docker",
        ],
        "other_label": "OTHER",
        "other": ["Driving licence - Category B"],
        "experience_label": "EXPERIENCE",
        "experience": [
            {
                "period": "2026 - Present",
                "title": "Data Scientist",
                "company": "Zapadoslovenska distribucna, a.s. - ZSE Group",
                "bullets": [
                    "Design and maintain Apache Spark and Delta Lake pipelines for large datasets and recurring analytical calculations.",
                    "Analyze application data structures and flows. Deliver extraction, transformation, analytical modelling, reporting and Microsoft Fabric CI/CD deployment.",
                    "Build analytical datasets and feature layers for GIS, metering and customer-data domains.",
                    "Apply data-quality checks, exploratory analysis and validation before data reaches analytical models and reports.",
                ],
            },
            {
                "period": "2025 - 2026",
                "title": "Data Analyst",
                "company": "Zapadoslovenska distribucna, a.s. - ZSE Group",
                "bullets": [
                    "Developed SQL and Python workflows for analytical datasets, reports and Power BI dashboards.",
                    "Performed exploratory analysis and built predictive models to identify trends and patterns in data.",
                    "Automated recurring data preparation and reporting to reduce manual work and improve consistency.",
                    "Prepared and integrated data for internal projects across Microsoft Fabric Data Lake and Data Warehouse environments.",
                ],
            },
        ],
        "toolkit_label": "CORE TOOLKIT",
        "toolkit": "Python / SQL / Apache Spark / Delta Lake / Microsoft Fabric / Databricks / Power BI",
        "footer": "BMSTACK / DIGITAL RESUME / EN / 2026",
    },
    "SK": {
        "file": "Marian-Bodnar-CV-SK.pdf",
        "location": "Bratislava, Slovensko",
        "phone_label": "TELEFÓN",
        "birth_label": "ROK NARODENIA",
        "role": "DATA SCIENCE / DATA ENGINEERING",
        "profile_label": "O MNE",
        "profile": (
            "Data Scientist so silným zameraním na Data Engineering a skúsenosťami s návrhom "
            "a údržbou pipeline v Apache Spark a Delta Lake, analytickými datasetmi a reportingovými "
            "riešeniami pre GIS, meranie a zákaznícke dáta."
        ),
        "languages_label": "JAZYKY",
        "languages": [("Slovenčina", "Materinský jazyk"), ("Angličtina", "B2")],
        "education_label": "VZDELANIE",
        "education": [
            ("2025 - Aktuálne", "Mgr. Aplikovaná informatika pre priemysel 4.0", "Paneurópska vysoká škola, Bratislava"),
            ("2021 - 2025", "Bc. Aplikovaná informatika pre priemysel 4.0", "Paneurópska vysoká škola, Bratislava"),
            ("2006 - 2010", "Elektrotechnika", "Stredná odborná škola, Rimavská Sobota - Tisovec"),
        ],
        "certifications_label": "CERTIFIKÁTY",
        "certifications": [
            ("DP-750", "Azure Databricks Data Engineer Associate", "Microsoft / 2026"),
            ("DP-700", "Fabric Data Engineer Associate", "Microsoft / 2025"),
            ("DP-600", "Fabric Analytics Engineer Associate", "Microsoft / 2025"),
            ("AI-900", "Azure AI Fundamentals", "Microsoft / 2025"),
            ("DP-900", "Azure Data Fundamentals", "Microsoft / 2024"),
        ],
        "skills_label": "SKILLS",
        "skills": [
            "Python / SQL",
            "Apache Spark / PySpark",
            "Delta Lake / Databricks",
            "Microsoft Fabric / CI/CD",
            "Power BI / Dátové modelovanie",
            "Git / GitHub / Docker",
        ],
        "other_label": "ĎALŠIE",
        "other": ["Vodičský preukaz - skupina B"],
        "experience_label": "SKÚSENOSTI",
        "experience": [
            {
                "period": "2026 - Aktuálne",
                "title": "Data Scientist",
                "company": "Západoslovenská distribučná, a.s. - Skupina ZSE",
                "bullets": [
                    "Návrh a údržba pipeline v Apache Spark a Delta Lake pre rozsiahle datasety a opakované analytické výpočty.",
                    "Analýza dátových štruktúr a tokov aplikácií vrátane extrakcie, transformácie, analytického modelovania, reportingu a nasadenia cez Microsoft Fabric CI/CD.",
                    "Tvorba analytických datasetov a feature vrstiev pre GIS, meranie a zákaznícke dáta.",
                    "Kontroly kvality dát, exploračná analýza a validácia pred použitím dát v analytických modeloch a reportoch.",
                ],
            },
            {
                "period": "2025 - 2026",
                "title": "Dátový analytik",
                "company": "Západoslovenská distribučná, a.s. - Skupina ZSE",
                "bullets": [
                    "Tvorba workflow v SQL a Pythone pre analytické datasety, reporty a Power BI dashboardy.",
                    "Exploračná analýza a tvorba prediktívnych modelov na identifikáciu trendov a vzorov v dátach.",
                    "Automatizácia opakovanej prípravy dát a reportingu s cieľom obmedziť manuálnu prácu a zvýšiť konzistentnosť.",
                    "Príprava a integrácia dát pre interné projekty v prostrediach Microsoft Fabric Data Lake a Data Warehouse.",
                ],
            },
        ],
        "toolkit_label": "HLAVNÉ NÁSTROJE",
        "toolkit": "Python / SQL / Apache Spark / Delta Lake / Microsoft Fabric / Databricks / Power BI",
        "footer": "BMSTACK / DIGITAL RESUME / SK / 2026",
    },
}


def register_fonts():
    ubuntu_dir = Path(
        r"C:\Users\SnackSeekerNB\.cache\codex-runtimes\codex-primary-runtime\dependencies"
        r"\native\poppler\Library\share\fonts"
    )
    fonts = {
        "EN": (ubuntu_dir / "Ubuntu-R.ttf", ubuntu_dir / "Ubuntu-B.ttf"),
        "SK": (ubuntu_dir / "Ubuntu-R.ttf", ubuntu_dir / "Ubuntu-B.ttf"),
    }
    registered = {}
    for language, (regular, bold) in fonts.items():
        regular_name = f"CV-{language}-Regular"
        bold_name = f"CV-{language}-Bold"
        if regular.exists() and bold.exists():
            pdfmetrics.registerFont(TTFont(regular_name, str(regular)))
            pdfmetrics.registerFont(TTFont(bold_name, str(bold)))
            registered[language] = (regular_name, bold_name)
        else:
            registered[language] = ("Helvetica", "Helvetica-Bold")
    return registered


FONT_SETS = register_fonts()
FONT, FONT_BOLD = FONT_SETS["EN"]


def paragraph(text, size=8.2, leading=11.0, color=INK, bold=False, space_after=0):
    return Paragraph(
        text,
        ParagraphStyle(
            name="cv",
            fontName=FONT_BOLD if bold else FONT,
            fontSize=size,
            leading=leading,
            textColor=color,
            alignment=TA_LEFT,
            spaceAfter=space_after,
            splitLongWords=False,
        ),
    )


def draw_paragraph(c, text, x, y_top, width, size=8.2, leading=11.0, color=INK, bold=False):
    flow = paragraph(text, size=size, leading=leading, color=color, bold=bold)
    _, height = flow.wrap(width, PAGE_H)
    flow.drawOn(c, x, y_top - height)
    return y_top - height


def section_heading(c, label, x, y, width):
    c.setFillColor(INK)
    c.setFont(FONT_BOLD, 9.7)
    c.drawString(x, y, label)
    c.setFillColor(ACCENT)
    c.rect(x, y - 8, 18, 2.2, stroke=0, fill=1)
    c.setStrokeColor(GRID)
    c.setLineWidth(0.5)
    c.line(x + 24, y - 6.9, x + width, y - 6.9)
    return y - 23


def draw_header(c, data):
    c.setFillColor(ACCENT)
    c.rect(MARGIN, PAGE_H - MARGIN - 4, 22, 3, stroke=0, fill=1)
    c.setFillColor(MUTED)
    c.setFont(FONT_BOLD, 6.7)
    c.drawString(MARGIN + 30, PAGE_H - MARGIN - 4, "BMSTACK / DIGITAL RESUME / 2026")

    photo_size = 113.51  # Enlarged by another 4 mm while preserving its center.
    photo_x = SIDEBAR_X + (SIDEBAR_W - photo_size) / 2
    header_top = PAGE_H - MARGIN - 4
    header_bottom = BODY_TOP + 18
    photo_y = (header_top + header_bottom - photo_size) / 2
    image = ImageReader(str(PHOTO_PATH))
    iw, ih = image.getSize()
    scale = max(photo_size / iw, photo_size / ih)
    draw_w, draw_h = iw * scale, ih * scale
    c.saveState()
    clip = c.beginPath()
    clip.circle(photo_x + photo_size / 2, photo_y + photo_size / 2, photo_size / 2)
    c.clipPath(clip, stroke=0, fill=0)
    c.drawImage(
        image,
        photo_x - (draw_w - photo_size) / 2,
        photo_y - (draw_h - photo_size) / 2,
        draw_w,
        draw_h,
        preserveAspectRatio=True,
        mask="auto",
    )
    c.restoreState()
    c.setStrokeColor(ACCENT)
    c.setLineWidth(2.2)
    c.circle(photo_x + photo_size / 2, photo_y + photo_size / 2, photo_size / 2, stroke=1, fill=0)

    identity_x = MAIN_X
    c.setFillColor(INK)
    c.setFont(FONT_BOLD, 29)
    c.drawString(identity_x, PAGE_H - MARGIN - 35, "Marian Bodnar")
    c.setFont(FONT_BOLD, 10.2)
    c.drawString(identity_x, PAGE_H - MARGIN - 56, data["role"])

    contact_y = PAGE_H - MARGIN - 83
    contact_items = [
        ("EMAIL", "bmstack@proton.me", 0, 0),
        ("WEB", "bmstack.eu", 130, 0),
        ("LINKEDIN", "Marian Bodnar", 230, 0),
        (data["phone_label"], "+421 950 596 214", 0, -28),
        ("LOCATION", data["location"], 130, -28),
        (data["birth_label"], "1991", 230, -28),
    ]
    for label, value, offset, row_offset in contact_items:
        c.setFillColor(MUTED)
        c.setFont(FONT_BOLD, 5.8)
        c.drawString(identity_x + offset, contact_y + row_offset + 10, label)
        c.setFillColor(INK)
        c.setFont(FONT, 7.4)
        c.drawString(identity_x + offset, contact_y + row_offset, value)

    c.setFillColor(ACCENT)
    c.rect(MARGIN, BODY_TOP + 18, PAGE_W - 2 * MARGIN, 2.4, stroke=0, fill=1)

    c.linkURL("mailto:bmstack@proton.me", (identity_x, contact_y - 2, identity_x + 105, contact_y + 9), relative=0)
    c.linkURL("https://bmstack.eu", (identity_x + 130, contact_y - 2, identity_x + 189, contact_y + 9), relative=0)
    c.linkURL("https://www.linkedin.com/in/majo1991", (identity_x + 230, contact_y - 2, identity_x + 315, contact_y + 9), relative=0)
    c.linkURL("tel:+421950596214", (identity_x, contact_y - 30, identity_x + 88, contact_y - 19), relative=0)


def draw_sidebar(c, data):
    x = SIDEBAR_X
    width = SIDEBAR_W
    y = BODY_TOP - 2
    c.setStrokeColor(GRID)
    c.setLineWidth(0.7)
    divider_x = SIDEBAR_X + SIDEBAR_W + GUTTER / 2
    c.line(divider_x, BODY_BOTTOM, divider_x, BODY_TOP + 2)

    y = section_heading(c, data["languages_label"], x, y, width)
    for language, level in data["languages"]:
        c.setFillColor(INK)
        c.setFont(FONT_BOLD, 8.2)
        c.drawString(x, y, language)
        c.setFillColor(MUTED)
        c.setFont(FONT, 8.2)
        c.drawRightString(x + width, y, level)
        y -= 14
    y -= 8

    y = section_heading(c, data["skills_label"], x, y, width)
    for skill in data["skills"]:
        c.setFillColor(INK)
        c.circle(x + 2, y - 3.4, 1.1, stroke=0, fill=1)
        y = draw_paragraph(c, skill, x + 10, y, width - 10, size=7.7, leading=9.2, color=MUTED)
        y -= 5
    y -= 6

    y = section_heading(c, data["education_label"], x, y, width)
    for period, field, school in data["education"]:
        c.setFillColor(ACCENT)
        c.setFont(FONT_BOLD, 7.2)
        c.drawString(x, y, period.upper())
        y -= 13
        y = draw_paragraph(c, field, x, y, width, size=8.0, leading=9.6, bold=True)
        y -= 2
        y = draw_paragraph(c, school, x, y, width, size=7.3, leading=8.7, color=MUTED)
        y -= 9
    y -= 2

    y = section_heading(c, data["certifications_label"], x, y, width)
    for code, title, meta in data["certifications"]:
        c.setFillColor(INK)
        c.roundRect(x, y - 1, 33, 13, 2.5, stroke=0, fill=1)
        c.setFillColor(WHITE)
        c.setFont(FONT_BOLD, 6.6)
        c.drawCentredString(x + 16.5, y + 3.0, code)
        title_y = draw_paragraph(c, title, x + 40, y + 11, width - 40, size=7.3, leading=8.5, bold=True)
        c.setFillColor(MUTED)
        c.setFont(FONT, 6.7)
        c.drawString(x + 40, title_y - 8, meta)
        y = min(y - 31, title_y - 19)

    y -= 6
    y = section_heading(c, data["other_label"], x, y, width)
    for item in data["other"]:
        c.setFillColor(INK)
        c.circle(x + 2, y - 3.4, 1.1, stroke=0, fill=1)
        y = draw_paragraph(c, item, x + 10, y, width - 10, size=7.6, leading=9.2, color=MUTED)
        y -= 7

    if y < BODY_BOTTOM:
        raise ValueError(f"Sidebar exceeds the A4 content area: {y:.1f} < {BODY_BOTTOM}")


def draw_experience(c, data):
    x = MAIN_X
    width = MAIN_W
    y = BODY_TOP - 2
    y = section_heading(c, data["profile_label"], x, y, width)
    y = draw_paragraph(c, data["profile"], x, y, width, size=8.2, leading=11.0, color=MUTED)
    y -= 20
    y = section_heading(c, data["experience_label"], x, y, width)

    for index, job in enumerate(data["experience"]):
        c.setFillColor(ACCENT)
        c.setFont(FONT_BOLD, 7.8)
        c.drawString(x, y + 2, job["period"].upper())
        c.setFillColor(INK)
        c.setFont(FONT_BOLD, 15.2)
        c.drawString(x, y - 21, job["title"])
        y -= 37
        y = draw_paragraph(c, job["company"], x, y, width, size=8.2, leading=10, bold=True)
        c.setFillColor(MUTED)
        c.setFont(FONT, 7.5)
        c.drawString(x, y - 12, data["location"])
        y -= 25

        for item in job["bullets"]:
            c.setFillColor(INK)
            c.circle(x + 2.5, y - 4.2, 1.25, stroke=0, fill=1)
            y = draw_paragraph(c, item, x + 12, y, width - 12, size=8.1, leading=10.6, color=MUTED)
            y -= 8

        if index == 0:
            y -= 8
            c.setStrokeColor(GRID)
            c.setLineWidth(0.8)
            c.line(x, y, x + width, y)
            y -= 22

def draw_cv_page(c, language):
    global FONT, FONT_BOLD
    FONT, FONT_BOLD = FONT_SETS[language]
    data = DATA[language]

    c.setFillColor(WHITE)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    draw_header(c, data)
    draw_sidebar(c, data)
    draw_experience(c, data)

    c.setFillColor(MUTED)
    c.setFont(FONT, 6.5)
    c.drawString(MARGIN, 22, data["footer"])
    c.drawRightString(PAGE_W - MARGIN, 22, "bmstack.eu")
    c.linkURL("https://bmstack.eu", (PAGE_W - MARGIN - 48, 18, PAGE_W - MARGIN, 28), relative=0)

    c.showPage()


def generate():
    target = OUTPUT_DIR / "Marian-Bodnar-CV.pdf"
    c = canvas.Canvas(str(target), pagesize=A4, pageCompression=1)
    c.setTitle("Marian Bodnar CV - EN / SK")
    c.setAuthor("Marian Bodnar")
    c.setSubject("Data Science / Data Engineering CV")
    c.setCreator("bmstack.eu")

    for language in ("EN", "SK"):
        draw_cv_page(c, language)

    c.save()
    return target


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    print(generate())


if __name__ == "__main__":
    main()
