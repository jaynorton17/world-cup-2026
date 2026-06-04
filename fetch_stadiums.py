import os
import urllib.request
import zipfile

UNSPLASH_POOL = [
    '65yjpk2HSlA',  # Allianz Arena night match (soccer, Champions League)
    'qowyMze7jqg',  # Crowd at soccer game
    'NZwZg5oA6_U',  # Aerial view soccer stadium
    't1XCb5HtVqg',  # SoFi Stadium
    '858jVFBPO6s',  # MetLife Stadium
    '-rswaO9lrzE',  # Stadium interior
    'lrTSZaprSZA',  # Myron Mott stadium
    'eoi7E12koaM',  # Myron Mott stadium
    'ad7s7Y7gAXI',  # Aerial football stadium
    'LemW56Wd7SE',  # Stadium
    'Q1x7RzD_MP0',  # Stadium
    'se1PI2uy1-g',  # Stadium
]

VENUES = [
    {"name": "Estadio Azteca", "city": "Mexico City", "country": "Mexico"},
    {"name": "Estadio Akron", "city": "Guadalajara", "country": "Mexico"},
    {"name": "Estadio BBVA", "city": "Guadalupe", "country": "Mexico"},
    {"name": "Estadio Banorte", "city": "Mexico City", "country": "Mexico"},
    {"name": "Estadio Guadalajara", "city": "Guadalajara", "country": "Mexico"},
    {"name": "Estadio Monterrey", "city": "Monterrey", "country": "Mexico"},
    {"name": "Mercedes-Benz Stadium", "city": "Atlanta", "country": "USA"},
    {"name": "Gillette Stadium", "city": "Foxborough", "country": "USA"},
    {"name": "AT&T Stadium", "city": "Dallas", "country": "USA"},
    {"name": "NRG Stadium", "city": "Houston", "country": "USA"},
    {"name": "GEHA Field at Arrowhead Stadium", "city": "Kansas City", "country": "USA"},
    {"name": "SoFi Stadium", "city": "Los Angeles", "country": "USA"},
    {"name": "Hard Rock Stadium", "city": "Miami", "country": "USA"},
    {"name": "MetLife Stadium", "city": "East Rutherford", "country": "USA"},
    {"name": "Lincoln Financial Field", "city": "Philadelphia", "country": "USA"},
    {"name": "Levi's Stadium", "city": "Santa Clara", "country": "USA"},
    {"name": "Lumen Field", "city": "Seattle", "country": "USA"},
    {"name": "BMO Field", "city": "Toronto", "country": "Canada"},
    {"name": "BC Place", "city": "Vancouver", "country": "Canada"},
    {"name": "Atlanta Stadium", "city": "Atlanta", "country": "USA"},
]

FIXTURE_SLOTS = [
    "group_a_match_1", "group_a_match_2", "group_a_match_3",
    "group_b_match_1", "group_b_match_2", "group_b_match_3",
    "group_c_match_1", "group_c_match_2", "group_c_match_3",
    "group_d_match_1", "group_d_match_2", "group_d_match_3",
    "group_e_match_1", "group_e_match_2", "group_e_match_3",
    "group_f_match_1", "group_f_match_2", "group_f_match_3",
    "group_g_match_1", "group_g_match_2", "group_g_match_3",
    "group_h_match_1", "group_h_match_2", "group_h_match_3",
    "round_of_32_1", "round_of_32_2", "round_of_32_3", "round_of_32_4",
    "round_of_16_1", "round_of_16_2", "round_of_16_3", "round_of_16_4",
    "quarter_final_1", "quarter_final_2", "quarter_final_3", "quarter_final_4",
    "semi_final_1", "semi_final_2",
    "third_place",
    "final",
]

OUT_DIR = "public/stadium_assets"
ZIP_NAME = "stadiums.zip"


def normalize_name(stadium, city):
    raw = f"{stadium}_{city}"
    raw = raw.lower()
    raw = raw.replace("'", "").replace("&", "and")
    raw = raw.replace(",", "").replace(".", "")
    parts = raw.split()
    return "_".join(parts)


def pick_photo_id(key):
    h = 0
    for ch in key:
        h = ((h << 5) - h) + ord(ch)
        h &= 0xFFFFFFFF
    return UNSPLASH_POOL[abs(h) % len(UNSPLASH_POOL)]


def download_image(url, filepath):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        urllib.request.urlretrieve(url, filepath)
        return True, None
    except Exception as e:
        return False, str(e)


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    downloaded = 0
    errors = 0

    for v in VENUES:
        fname = normalize_name(v["name"], v["city"]) + ".jpg"
        fpath = os.path.join(OUT_DIR, fname)
        if os.path.exists(fpath):
            print(f"  [OK] {fname} (already exists, skipping)")
            downloaded += 1
            continue
        pid = pick_photo_id(f"{v['name']} {v['city']}")
        url = f"https://unsplash.com/photos/{pid}/download?force=true&w=800"
        ok, err = download_image(url, fpath)
        if ok:
            fsize = os.path.getsize(fpath) // 1024
            print(f"  [OK] {fname} ({fsize} KB)")
            downloaded += 1
        else:
            print(f"  [FAIL] {fname} - {err}")
            errors += 1

    for slot in FIXTURE_SLOTS:
        fname = f"fixture_{slot}.jpg"
        fpath = os.path.join(OUT_DIR, fname)
        if os.path.exists(fpath):
            print(f"  [OK] {fname} (already exists, skipping)")
            downloaded += 1
            continue
        pid = pick_photo_id(slot)
        url = f"https://unsplash.com/photos/{pid}/download?force=true&w=800"
        ok, err = download_image(url, fpath)
        if ok:
            fsize = os.path.getsize(fpath) // 1024
            print(f"  [OK] {fname} ({fsize} KB)")
            downloaded += 1
        else:
            print(f"  [FAIL] {fname} - {err}")
            errors += 1

    total = len(VENUES) + len(FIXTURE_SLOTS)
    total_kb = sum(os.path.getsize(os.path.join(OUT_DIR, f)) for f in os.listdir(OUT_DIR)) // 1024 if os.listdir(OUT_DIR) else 0
    print(f"\nProcessed {total} items: {downloaded} OK, {errors} errors ({total_kb} KB in {OUT_DIR}/)")

    zip_path = os.path.join(os.getcwd(), ZIP_NAME)
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for root, dirs, files in os.walk(OUT_DIR):
            for f in sorted(files):
                fpath = os.path.join(root, f)
                arcname = os.path.relpath(fpath, os.getcwd())
                zf.write(fpath, arcname)

    zip_size = os.path.getsize(zip_path)
    print(f"Created {ZIP_NAME} ({zip_size / 1024:.1f} KB) with {len(os.listdir(OUT_DIR))} assets")


if __name__ == "__main__":
    main()
