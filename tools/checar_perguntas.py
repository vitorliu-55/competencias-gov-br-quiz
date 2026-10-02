"""Lista perguntas cujo enunciado pode entregar a resposta (para revisão humana).

Uso: python tools/checar_perguntas.py
"""
import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

# Trechos que costumam indicar a etapa do processo e denunciar a resposta.
PISTAS = [
    r"autorizad", r"referendad", r"aprovad[oa] pel", r"parecer pr[ée]vio",
    r"ap[óo]s (a )?aprova", r"depois de (ser )?(aprovad|autorizad)", r"sess[ãa]o conjunta",
    r"indicad[oa] pel",
]
STR = r'"((?:[^"\\]|\\.)*)"'

src = Path(__file__).resolve().parent.parent.joinpath("questions.js").read_text(encoding="utf-8")
blocos = re.split(r"\n\s*\{\s*\n\s*id:", src)[1:]
alertas = 0
for b in blocos:
    id_ = re.match(r'\s*"([^"]+)"', b).group(1)
    enun = re.search(r"pergunta:\s*" + STR, b).group(1)
    alts = re.findall(STR, re.search(r"alternativas:\s*\[(.*?)\]", b, re.S).group(1))
    achados = []
    if not re.search(r'dificuldade:\s*"(facil|media|dificil)"', b):
        achados.append("sem dificuldade (facil, media ou dificil)")
    for a in alts:
        nome = re.sub(r"\s*\(.*?\)", "", a).strip()
        if len(nome) > 3 and nome.lower() in enun.lower():
            achados.append(f"cita a alternativa '{nome}'")
    for p in PISTAS:
        if re.search(p, enun, re.I):
            achados.append(f"termo suspeito /{p}/")
    if achados:
        alertas += 1
        print(f"{id_}: {enun}\n    -> " + "; ".join(achados))
print(f"\n{alertas} pergunta(s) para revisar de {len(blocos)}.")
