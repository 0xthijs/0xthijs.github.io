import tomllib
import yaml
import sys

def check_toml(path):
    try:
        with open(path, "rb") as f:
            tomllib.load(f)
        print(f"✅ {path}: Valid TOML")
    except Exception as e:
        print(f"❌ {path}: Invalid TOML - {e}")
        sys.exit(1)

def check_yaml(path):
    try:
        with open(path, "r") as f:
            yaml.safe_load(f)
        print(f"✅ {path}: Valid YAML")
    except Exception as e:
        print(f"❌ {path}: Invalid YAML - {e}")
        sys.exit(1)

if __name__ == "__main__":
    check_toml("hugo.toml")
    check_yaml(".github/workflows/hugo.yaml")
